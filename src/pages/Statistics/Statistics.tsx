import {useStatistics} from "@/pages/Statistics/hooks/useStatistics.ts";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {SearchIcon} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import CustomPagination from "@/components/Pagination/CustomPagination.tsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Statistics = () => {
    const { state, functions } = useStatistics()

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            {state.displayedData.length > 0 && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="font-semibold">Лидер: </span>
                            {state.displayedData[0].fullName} ({state.displayedData[0].orderAmount} заказов)
                        </div>
                        <div>
                            <span className="font-semibold">Среднее: </span>
                            {Math.round(state.displayedData.reduce((sum, op) =>
                                sum + op.orderAmount, 0) / state.displayedData.length)} заказов
                        </div>
                        <div>
                            <span className="font-semibold">Всего заказов: </span>
                            {state.displayedData.reduce((sum, op) =>
                                sum + op.orderAmount, 0)}
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Статистика заказов по операторам
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Показано: {state.displayedData.length} из {state.processedData.length} операторов
                    </p>
                </div>
                <div className="w-full lg:w-64">
                    <Input
                        leftIcon={<SearchIcon className='h-5 w-5' />}
                        placeholder="Поиск..."
                        onChange={(e) => {
                            functions.debouncedSearchByName(e.target.value)
                        }}
                        className='h-10 max-w-64'
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                    <span>Топ-3 оператора</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Топ-10 операторов</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <span>Остальные операторы</span>
                </div>
            </div>
            <div className="h-[700px] border border-gray-200 rounded-lg p-4 mb-4">
                <Bar options={state.options} data={state.chartData}/>
            </div>
            <CustomPagination totalPages={state.totalPage} isGoToStart={state.goToStart} />
        </div>
    )
}

export default Statistics;