import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch";   
import Banner from "../../components/Banner/Banner";
import FilterHotel from "../../components/Filter/FilterHotel";
import "./filter.css";

const Filter = () => {
    return (
        <>
            <Banner />
            <AdvanceSearch />
            <FilterHotel />
        </>
    )
}

export default Filter;