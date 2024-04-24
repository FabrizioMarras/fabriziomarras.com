import { useState, useEffect, useRef } from 'react'

const Filter = ({ handleFilterChange, filters, selectedFilters }) => {
    const [isOpen, setIsOpen] = useState(false);
    const filterOptionsRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (filterOptionsRef.current && !filterOptionsRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    // Function to handle click on the filter icon
    const handleIconClick = () => {
      setIsOpen(!isOpen); // Toggle the state to revert the position of spheres
  
    };
    // Determine the color of the icon based on whether there are selected filters
    const iconColor = selectedFilters.length === 0 ? "#46739a" : "#217ec4";
  
    return (
      <div className={`${isOpen ? 'open' : 'close'} filters `} ref={filterOptionsRef}>
        <div className='filter-icon scale-150 cursor-pointer' onClick={handleIconClick}>
          <svg className="h-6 w-6 inline-block" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1={isOpen ? "4" : "18"} y1="6" x2={isOpen ? "20" : "4"} y2="6" stroke={iconColor} strokeWidth="1" />
            <circle cx={isOpen ? "6" : "18"} cy="6" r="2" fill={isOpen ? iconColor : "black"} stroke={iconColor} strokeWidth="1"  />
            <line x1={isOpen ? "4" : "6"} y1="12" x2='20' y2="12" stroke={iconColor} strokeWidth="1" />
            <circle cx={isOpen ? "18" : "6"} cy="12" r="2" fill={isOpen ? iconColor : "black"} stroke={iconColor} strokeWidth="1" />
            <line x1={isOpen ? "4" : "20"} y1="18" x2={isOpen ? "20" : "4"} y2="18" stroke={iconColor} strokeWidth="1" />
            <circle cx={isOpen ? "6" : "18"} cy="18" r="2" fill={isOpen ? iconColor : "black"} stroke={iconColor} strokeWidth="1" />
          </svg>
        </div>
        <div className='filters-options absolute top-[40px] right-0 bg-[#000000] border-2 border-tertiary p-4 rounded-xl min-w-[192px]'>
          {filters.map(filter => (
            <div key={filter.name} className="flex items-center">
            <input
              type="checkbox"
              id={filter.name}
              value={filter.name}
              onChange={handleFilterChange}
              className="hidden"
            />
            <label htmlFor={filter.name} className="ml-2 text-white font-thin cursor-pointer">{filter.name}</label>
          </div>
          
          ))}
        </div>
      </div>
    )
  }

export default Filter