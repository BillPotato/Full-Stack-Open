const FilterField = ({filterWord, onFilterChange}) => {
  return (
    <div>
      filter shown with <input value = {filterWord} onChange = {onFilterChange} />
    </div>
  )
}

export default FilterField