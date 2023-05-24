import { useSelector } from 'react-redux'

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <div>
      {userInfo.userName}
    </div>
  )
}
export default ProfilePage