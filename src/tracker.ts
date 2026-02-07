import { EventType, IncrementalSource, MouseInteractions } from 'rrweb';

type LogEntry = {
    log: string;
};

type UserEvent = {
    timestamp: number;
    type: number;
    data: any;
};

class UserTracker {
    private logsQueue: LogEntry[] = [];
    private isSending = false;
    private flushTimer: number | null = null;
    private readonly endpoint: string;
    private readonly batchSize: number;
    private readonly flushInterval: number;

    constructor(
        endpoint: string,
        batchSize: number = 10,
        flushInterval: number = 5000
    ) {
        this.endpoint = endpoint;
        this.batchSize = batchSize;
        this.flushInterval = flushInterval;

        this.startTracking();
        this.startAutoFlush();

        console.log('UserTracker инициализирован');
    }

    private startTracking() {
        import('rrweb').then((rrweb) => {
            const allowedSources = [
                IncrementalSource.MouseInteraction,
                IncrementalSource.Input
            ];

            const allowedMouseEvents = [
                MouseInteractions.Click
            ];

            rrweb.record({
                emit: (event: UserEvent) => {
                    let elem;

                    if (event.type !== EventType.IncrementalSnapshot) return;
                    if (!allowedSources.includes(event.data?.source)) return;
                    if (event.data?.source === IncrementalSource.MouseInteraction) {
                        if (!allowedMouseEvents.includes(event.data?.type)) return;
                        elem = document.elementFromPoint(event.data.x, event.data.y);
                    } else if (event.data?.source === IncrementalSource.Input) {
                        elem = {
                            tagName: "input",
                            id: null,
                            className: null
                        }
                    }

                    if (elem) {
                        event.data.enriched = {
                            tagName: elem.tagName.toLowerCase(),
                            id: elem.id,
                            className: elem.className
                        };
                    }

                    this.handleEvent(event);
                },
                recordCrossOriginIframes: true
            });
        });
    }

    private handleEvent(event: UserEvent) {
        const logString = this.formatEvent(event);
        this.logsQueue.push({ log: logString });

        if (this.logsQueue.length >= this.batchSize) {
            this.sendLogs();
        }
    }

    private formatEvent(event: UserEvent): string {
        const { timestamp, type, data } = event;
        const date = new Date(timestamp);
        const page = window.location.pathname;

        const { element, action } = this.parseEventType(type, data);
        const userId = this.getUserId();

        return `${date.toISOString()} ${page} ${element} ${action} ${userId}`;
    }

    private parseEventType(type: number, data: any): { element: string; action: string } {
        let action = 'UNKNOWN';

        switch (type) {
            case EventType.DomContentLoaded:
            case EventType.Load:
                action = 'PAGE_LOAD';
                break;

            case EventType.IncrementalSnapshot:
                switch (data?.source) {
                    case IncrementalSource.Input:
                        action = 'INPUT';
                        break;

                    case IncrementalSource.MouseInteraction:
                        if (data?.type === MouseInteractions.Click) {
                            action = 'CLICK';
                        }
                        break;
                }
                break;
        }

        const element = this.getElementName(data.enriched);

        return { element, action };
    }

    private getElementName(enrichedData: any): string {
        if (!enrichedData) return 'unknown';

        if (enrichedData.id) return `#${enrichedData.id}`;
        if (enrichedData.className) {
            const mainClass = enrichedData.className.split(' ')[0];
            return `${enrichedData.tagName}.${mainClass}`;
        }

        return enrichedData.tagName || 'unknown';
    }

    private getUserId(): string {
        const key = 'user_tracking_id';
        let userId = localStorage.getItem(key);

        if (!userId) {
            userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem(key, userId);
        }

        return userId;
    }

    private async sendLogs(): Promise<void> {
        if (this.isSending || this.logsQueue.length === 0) return;

        this.isSending = true;
        const logsToSend = this.logsQueue.splice(0, this.batchSize);

        try {
            console.log(`Отправка ${logsToSend.length} логов...`);
            console.log(logsToSend)

            /*const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ logs: logsToSend })
            });

            if (!response.ok) {
                console.error(`HTTP ${response.status}`);
            }*/

            console.log(`Логи отправлены`);
        } catch (error) {
            console.error('Ошибка отправки:', error);
            this.logsQueue.unshift(...logsToSend);
            await this.delay(3000);
        } finally {
            this.isSending = false;
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private startAutoFlush() {
        if (this.flushTimer) return;

        this.flushTimer = setInterval(async () => {
            if (this.logsQueue.length > 0) {
                await this.sendLogs();
            }
        }, this.flushInterval);
    }
}

const tracker = new UserTracker('https://ваш-сервер.ru/api/logs', 15, 10000);
export default tracker;