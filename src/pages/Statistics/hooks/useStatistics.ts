import {useMemo, useState} from "react";
import {useDebounceCallback} from "@/utils/hooks/useDebounceCallback/useDebounceCallback.ts";
import {Scale, type TooltipItem} from "chart.js";
import {useSearchParams} from "react-router-dom";
import {useGetStateOrderQuery} from "@/utils/api/hooks/useGetStateOrderQuery.ts";

const SEARCH_TIMEOUT = 500;
const ITEMS_PER_PAGE = 20;
export const useStatistics = () => {
    const state = useGetStateOrderQuery()
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [goToStart, setGoToStart] = useState(false);

    const debouncedSearchByName = useDebounceCallback((name: string) => {
        setSearchTerm(name); 
        setGoToStart(prev => !prev)
    }, SEARCH_TIMEOUT);

    const processedData = useMemo(() => {
        if (!state.data) return []
        let filtered = state.data.data;

        if (searchTerm) {
            filtered = state.data.data.filter(operator =>
                operator.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered.sort((a, b) => b.orderAmount - a.orderAmount);
    }, [state.data, searchTerm]);

    const displayedData = useMemo(() => {
        const currentPage = parseInt(searchParams.get('page') || "1") - 1;
        const startItem = ITEMS_PER_PAGE * currentPage;
        return processedData.slice(startItem, startItem + ITEMS_PER_PAGE)
    }, [processedData, searchParams]);

    const totalPage = useMemo(() => {
        return Math.ceil(processedData.length / ITEMS_PER_PAGE);
    }, [processedData]);

    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function(context: TooltipItem<'bar'>) {
                        return `${context.parsed.x} заказов`;
                    }
                }
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: '#6B7280',
                },
                title: {
                    display: true,
                    text: 'Количество заказов',
                    color: '#374151',
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#374151',
                    font: {
                        size: 12,
                        weight: 'normal' as const
                    },
                    callback: function(this: Scale, value: string | number) {
                        const label = this.getLabelForValue(typeof value === 'number' ? value : parseFloat(value));
                        return label.length > 25 ? label.substring(0, 25) + '...' : label;
                    }
                },
            }
        }
    };

    const chartData = {
        labels: displayedData.map(operator => operator.fullName),
        datasets: [
            {
                label: 'Заказы',
                data: displayedData.map(operator => operator.orderAmount),
                backgroundColor: displayedData.map((_operator, index) => {
                    if (index < 3 && !searchParams.get('page')) return 'rgba(16, 185, 129, 0.8)';
                    if (index < 10 && !searchParams.get('page')) return 'rgba(59, 130, 246, 0.8)';
                    return 'rgba(156, 163, 175, 0.7)';
                }),
                borderColor: displayedData.map((_operator, index) => {
                    if (index < 3 && !searchParams.get('page')) return 'rgb(16, 185, 129)';
                    if (index < 10 && !searchParams.get('page')) return 'rgb(59, 130, 246)';
                    return 'rgb(156, 163, 175)';
                }),
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false,
                barThickness: 20
            },
        ],
    };

    return {
        state: { options, chartData, displayedData, processedData, totalPage, goToStart },
        functions: { debouncedSearchByName }
    }
}