export function getOnlySelectedWeekDays(weekDays){
    const allSelectedDays = weekDays.filter((day) => day.selected);

    const daysName = [];
    for (const day of allSelectedDays) {
        daysName.push(day.name.toLowerCase());
    }

    return daysName;
}

export function getOnlySelectedCategories(categories){
    const allSelectedCategories = categories.filter((categ) => categ.selected);

    const categsName = [];
    for (const categ of allSelectedCategories) {
        categsName.push(categ.name.toLowerCase());
    }

    return categsName;
}