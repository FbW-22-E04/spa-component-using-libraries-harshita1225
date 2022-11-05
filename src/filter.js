export default function filterList(allEntries, searchTerm) {
    const filteredArray = allEntries.filter(item => {
        return item.location.city.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    })
    return filteredArray
}
