import OperatorItem from './components/OperatorItem';
import { SquarePlus } from 'lucide-react';
import { useOperators } from './hooks/useOperators';
import NewOperatorDialog from './components/NewOperatorDialog/NewOperatorDialog';
import CustomPagination from '@/components/Pagination/CustomPagination';

const Operators = () => {
    const { state, functions } = useOperators();

    return (
        <div className="flex flex-col items-center mt-8 gap-8 w-full">
            <div className='flex flex-row justify-between items-center w-[90%]'>
                <span className='text-4xl font-medium text-center flex-1'>Управление операторами</span>
                <SquarePlus className='w-[36px] h-[36px] cursor-pointer add-operator' onClick={() => functions.setIsOpen(true)}></SquarePlus>
                <NewOperatorDialog isOpen={state.isOpen} setIsOpen={functions.setIsOpen} newOperator={state.newOperator}
                    reloadOperators={state.operators.refetch} />
            </div>
            <div className='flex flex-col items-center w-[90%] border border-black rounded-lg divide-y divide-black'>
                {
                    state.displayedData.map(operator => (
                        <OperatorItem operator={operator} />
                    ))
                }
            </div>
            <div className='mb-6'>
                <CustomPagination totalPages={state.totalPage} />
            </div>
        </div>
    )
}

export default Operators;