import CategoryAddNew from "module/category/CategoryAddNew";
import CategoryManage from "module/category/CategoryManage";
import CategoryUpdate from "module/category/CategoryUpdate";
import DashboardLayout from "module/dashboard/DashboardLayout";
import DashboardPage from "module/dashboard/DashboardPage";
import PostAddNew from "module/post/PostAddNew";
import PostManage from "module/post/PostManage";
import PostUpdate from "module/post/PostUpdate";
import UserAddNew from "module/user/UserAddNew";
import UserManage from "module/user/UserManage";
import UserUpdate from "module/user/UserUpdate";
import HomePage from "pages/HomePage";
import NotFound from "pages/NotFound";
import PostDetailPage from "pages/PostDetailPage";
import SignInPage from "pages/SignInPage";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SignupPage from "./pages/SignupPage";


function App() {
  return (
    <div className="">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignupPage />}/>
          <Route path="/sign-in" element={<SignInPage />}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/:slug" element={<PostDetailPage />} />
          <Route element={<DashboardLayout />} >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/manage/post" element={<PostManage />} />
            <Route path="/manage/add-post" element={<PostAddNew />} />
            <Route path="/manage/add-category" element={<CategoryAddNew />} />
            <Route path="/manage/update-post" element={<PostUpdate />} />
            <Route path="/manage/category" element={<CategoryManage />} />
            <Route path="/manage/update-category" element={<CategoryUpdate />} />
            <Route path="/manage/user" element={<UserManage />} />
            <Route path="/manage/add-user" element={<UserAddNew />} />
            <Route path="/manage/update-user" element={<UserUpdate />} />
          </Route>
        </Routes>
      </AuthProvider>
      
    </div>
  )
}

export default App;
