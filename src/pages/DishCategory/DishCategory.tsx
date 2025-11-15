import {Button} from "@/components/ui/button.tsx";
import {useDishCategory} from "@/pages/DishCategory/hooks/useDishCategory.ts";
import DishCategoryCard from "@/pages/DishCategory/components/DishCategoryCard/DishCategoryCard.tsx";
import CustomPagination from "@/components/Pagination/CustomPagination.tsx";
import DishCategoryDialog from "@/pages/DishCategory/components/DishCategoryDialog/DishCategoryDialog.tsx";
import CancelDeleteDialog from "@/pages/DishCategory/components/CancelDeleteDialog/CancelDeleteDialog.tsx";

const DishCategory = () => {
    const { state, functions } = useDishCategory()

    return (
        <div className="mx-auto mt-4 flex flex-col gap-10 p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p className="text-4xl font-medium text-center md:text-start">{"Управление категориями блюд"}</p>
                <Button className="h-10" onClick={functions.openCreateCategory}>
                    {"Добавить категорию"}
                </Button>
            </div>
            {state.displayedData.length && state.displayedData.length > 0 ? (
                <>
                    <div className="flex items-center justify-around flex-wrap gap-10">
                        {state.displayedData.map(category => (
                            <DishCategoryCard {...category} key={category.id} refetchCategories={functions.refetch}
                                              setDishCategory={functions.openEditCategory}
                                              openCancelDelete={() => functions.setCanselDeleteOpen(true)} />
                        ))}
                    </div>
                    <CustomPagination totalPages={state.totalPage}/>
                </>
            ) : (
                <p className="text-xl font-bold">{"Нет категорий блюд"}</p>
            )}
            <DishCategoryDialog isOpen={state.isOpen} setIsOpen={functions.setIsOpen} reloadCategories={state.categories.refetch}
                                initialData={state.categoryData} categoryId={state.categoryId}/>
            <CancelDeleteDialog isOpen={state.canselDeleteOpen} setIsOpen={functions.setCanselDeleteOpen}/>
        </div>
    )
}

export default DishCategory;