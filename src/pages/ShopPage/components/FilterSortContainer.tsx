import { Dropdown, Container } from "react-bootstrap";
import { sortList, filterList } from "./FilterSortList";

interface MethodsProps {
  setSortByType: any;
  setFilterByCategory: any;
}

export const FilterSortContainer = ({
  setSortByType,
  setFilterByCategory,
}: MethodsProps) => {
  const mapSortingList = sortList.map((el) => {
    return (
      <Dropdown.Item key={el.value} onClick={() => setSortByType(el.value)}>
        {el.text}
      </Dropdown.Item>
    );
  });

  const mapFilterList = filterList.map((el) => {
    return (
      <Dropdown.Item
        key={el.value}
        onClick={() => setFilterByCategory(el.value)}
      >
        {el.text}
      </Dropdown.Item>
    );
  });

  return (
    <Container className="d-flex gap-2 p-0">
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Sort by
        </Dropdown.Toggle>

        <Dropdown.Menu>{mapSortingList}</Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Filter by category
        </Dropdown.Toggle>

        <Dropdown.Menu>{mapFilterList}</Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};
