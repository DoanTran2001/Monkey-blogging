import ActionDelete from "components/action/ActionDelete";
import ActionEdit from "components/action/ActionEdit";
import ActionView from "components/action/ActionView";
import LabelStatus from "components/label/LabelStatus";
import Pagination from "components/pagination/Pagination";
import Table from "components/table/Table";
import Tooltip from "components/Tooltip/Tooltip";
import { db } from "firebase-app/firebaseConfig";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postStatus } from "utils/constants";

function PostManage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "posts");
    onSnapshot(colRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(result);
    });
  }, []);
  const handleDeletePost = async (id) => {
    const colRef = doc(db, "posts", id);
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
        Swal.fire("Deleted", "Posts has been deleted", "success");
      }
    });
  }
  const renderStatusPost = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case postStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>
      case postStatus.REJECTED:
        return <LabelStatus type="danger">Unapproved</LabelStatus>
      default:
    }
  }
  return (
    <div>
      <h1 className="dashboard-heading">Manage post</h1>
      <div className="mb-10 flex justify-end">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 &&
            posts.map((post) => (
              <tr key={post.id}>
                {/* <td title={`${post?.id}`}>{`${post?.id?.slice(0,5)}...`}</td> */}
                <td>
                  <Tooltip text={`${post?.id?.slice(0,5)}...`}>
                    {`${post?.id}`}
                  </Tooltip>
                </td>
                <td>
                  <div className="flex flex-col items-center gap-x-3">
                    <img
                      src={post?.image}
                      alt=""
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{post.title}</h3>
                      <time className="text-sm text-gray-500">
                      
                        Date: {new Date((post?.createAt?.seconds * 1000)).toLocaleString('vi-VI')}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500">{post?.category?.name}</span>
                </td>
                <td>
                  <span className="text-gray-500">{post?.user?.fullname}</span>
                </td>
                <td>
                  {/* {post.status === postStatus.APPROVED ? <LabelStatus type="success">Approved</LabelStatus> : post.status === postStatus.PENDING ? <LabelStatus type="warning">Unapproved</LabelStatus> : <LabelStatus >Pending</LabelStatus>} */}
                  {renderStatusPost(post.status)}
                </td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionView onClick={() => navigate(`/${post.slug}`)}/>
                    <ActionEdit onClick={() => navigate(`/manage/update-post?id=${post.id}`)}/>
                    <ActionDelete onClick={() => handleDeletePost(post.id)}/>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="mt-10">
        <Pagination></Pagination>
      </div>
    </div>
  );
}

export default PostManage;
