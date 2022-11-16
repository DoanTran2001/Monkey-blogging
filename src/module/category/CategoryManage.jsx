import ActionDelete from "components/action/ActionDelete";
import ActionEdit from "components/action/ActionEdit";
import ActionView from "components/action/ActionView";
import Button from "components/button/Button";
import LabelStatus from "components/label/LabelStatus";
import Table from "components/table/Table";
import { db } from "firebase-app/firebaseConfig";
import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, startAfter, where } from "firebase/firestore";
import { debounce } from "lodash";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { status } from "utils/constants";

function CategoryManage() {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const colRef = collection(db, "categories");
    // Nếu có filter(tức có nhập search trên input) thì query cái đó, nếu k có thì hiển thị danh sách category.
    const newRef = filter ? query(colRef, where("name", ">=", filter), where("name", "<=", filter + "utf8")) : colRef;
    onSnapshot(newRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(result);
    });
  }, [filter]);
  const handleDelete = async (id) => {
    const colRef = doc(db, "categories", id);
    // const docData = await getDoc(colRef);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted", "Category has been deleted", "success");
      }
    });
  };
  // Dùng debounce để hạn chế request liên tục lên firebase.
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  const handleLoadMore = async () => {
    const first = query(collection(db, "catefgories"), limit(1));
    const documentSnapshots = await getDocs(first);
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    const next = query(collection(db, "categories"), startAfter(lastVisible), limit(1));
    onSnapshot(next, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(result);
    });
  }
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage catefgories">
        <Button kind="ghost" to="/manage/add-category" type="button">
          Create category
        </Button>
      </DashboardHeading>
      <div className="mb-10 flex justify-end">
        <input
          type="text"
          className="border border-gray-300 border-solid p-3 rounded-lg focus:border-green-500 transition-all"
          placeholder="Search category..."
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Slug</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic text-gray-500">{category.slug}</span>
                </td>
                <td>
                  <LabelStatus
                    type={
                      category.status === status.APPROVED
                        ? "success"
                        : "warning"
                    }
                  >
                    {category.status === status.APPROVED
                      ? "Approved"
                      : "Unapproved"}
                  </LabelStatus>
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView />
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    />
                    <ActionDelete onClick={() => handleDelete(category.id)} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="mt-10">
        <button onClick={handleLoadMore}>Load more</button>
      </div>
    </div>
  );
}

export default CategoryManage;
