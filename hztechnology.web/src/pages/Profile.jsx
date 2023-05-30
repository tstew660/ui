import { useSelector, useDispatch } from 'react-redux'

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <>
      <div>
        {userInfo.firstName} {userInfo.lastName}
      </div>
      <div>
        {userInfo.email}
      </div>
      <div>
        {userInfo.phoneNumber}
      </div>
      <div>
        <h1>Roles</h1>
        <p>{userInfo.roles && userInfo.roles?.map((x) =>
        x
        )}</p>
      </div>
    </>
  )
}
export default ProfilePage