import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";

function CabinTableOperations() {
  return (
      <TableOperations>
          <Filter filerField = 'discount' options = {[{value:'all',label:'All'},{value:'no-discount',label:'No Discount'},{value:'with-discount',label:'With Discount'}]}/>
      </TableOperations>
  );
}

export default  CabinTableOperations
