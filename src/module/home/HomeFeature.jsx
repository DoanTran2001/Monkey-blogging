import Heading from 'components/layouts/Heading';
import { db } from 'firebase-app/firebaseConfig';
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore';
import PostFeatureItem from 'module/post/PostFeatureItem';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const HomeFeatureStyles = styled.div`
  padding: 10px 0;
`
const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  // Hiển thị các bài post có hot = true đc lấy từ database firestore. 
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("status", "==", 1), where("hot", "==", true), limit(3));
    onSnapshot(q, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setPosts(result);
    })
  }, []);
  // console.log(posts);
  if(posts.length <= 0) return null;
  return (
    <HomeFeatureStyles>
      <div className="container">
        <Heading>Feature</Heading>
        <div className="grid-layout">
          {
            posts.map(post => (
              <PostFeatureItem key={post.id} post={post}/>
            ))
          }
        </div>
      </div>
    </HomeFeatureStyles>
  )
}
export default HomeFeature;