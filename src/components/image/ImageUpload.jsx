import React from 'react'
import PropTypes from 'prop-types';

// Custom upload file.

// Component này nhận vào các props như: name, classname, progress : % progress khi upload, image: ảnh đc upload, handleDeleteImage: function delete image, ...rest: những thứ còn lại.

function ImageUpload(props) {
  const { name, className = "", progress = 0, image = "", handleDeleteImage = () => {}, ...rest } = props;

  return (
    <label className={`cursor-pointer flex items-center justify-center bg-gray-400 border border-dashed w-full min-h-[150px] rounded-lg ${className} relative overflow-hidden group`}>
      <input type="file" name={name} className="hidden-input" onChange={() => {}} {...rest} />
      {
        // Nếu progress không bằng 0 và chưa có image thì hiển thị loading
        progress !== 0 && !image && (
          <div className="loading w-10 h-10 border-8 border-green-500 border-t-transparent animate-spin absolute z-10 rounded-full"></div>
        )
      }
      {
        // Nếu progress = 0 và chưa có image thì hiển thị phần chọn hình ảnh upload
        !image && progress === 0 && (
          <div className="flex flex-col items-center text-center pointer-events-none mx-auto">
            <img src="/img-upload.png" alt="upload-img" className='max-w-[80px] mb-5'/>
            <p className='font-medium'>Choose photo</p>
          </div>
        )
      }
      {
        // Nếu có image thì hiển thị image và khi hover vào thì hiện icon thùng rác để xóa image
        image && (
          <>
            <img src={image} alt="" />
            <button type="button" className="absolute w-15 h-15 left-2/4 -translate-x-2/4 bg-slate-100 border rounded-lg shadow-lg flex items-center justify-center z-10 opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible" onClick={handleDeleteImage}>
              <img src="https://img.icons8.com/plasticine/100/000000/trash--v1.png" alt='' className='w-10 h-10 '/>
            </button>
          </>
        )
      }
      {
        // Nếu chưa có iamge thì hiển thị ra thanh progress với % đc nhận từ props progress.
        !image && (
          <div className="absolute w-5 h-1 bg-green-400 bottom-0 left-0 transition-all" style={{width: `${Math.ceil(progress)}%`}}></div>
        )
      }
    </label>
  )
}

ImageUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  process: PropTypes.number,
  image: PropTypes.string,
  handleDeleteImage: PropTypes.func,
}

export default ImageUpload;

