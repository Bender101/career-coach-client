import { Button, Avatar } from 'antd';
import { DownloadOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadAvatarAC } from '../../redux/thunk/usersAC';
import { useState } from 'react';

const Avatarka = () => {

  const dispatch = useDispatch();

  const user = useSelector((store) => store.users)

  const [image, setImage] = useState(null)

  const uploadHandler = async() => {
    // const data = new FormData();
    // data.append('file', image);
    // data.append('id', user.id)
    // console.log(data)
    //  await axios.put('http://localhost:3001/users/profile', data, {
    //   headers: {'Content-type': 'multipart/form-data'}
    // }).then(res => setAvatar(res.data.path))
    // dispatch(editProfileAC({ id:user.id, img: e.target.fio.value }));
    dispatch(uploadAvatarAC(image, user.id))
  }

  return ( 
    <div class="card-avatar">
     {
       user.avatar 
       ? <img src={`${user.avatar}`} alt="avatar"/>
       : <img src="img/avatar.png" alt="avatar"/>
     }
  <div class="avatar-container">
    <input type="file" onChange={(e => setImage(e.target.files[0]))}/>
  <Button onClick={uploadHandler}type="primary" shape="round" icon={<DownloadOutlined />} size='middle'>
          Download
        </Button>
  </div>
</div>


  );
}
 
export default Avatarka;
