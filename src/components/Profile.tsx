import * as React from 'react';
import user_icon from '../img/user_icon.svg';
import { auth, db } from '../fb';
import { ImgUpload } from './ImgUpload';
import { GlobalContext } from '../state/GlobalContext';
import { Redirect } from 'react-router-dom';

interface Props {}

export const Profile: React.FC<Props> = (props) => {
	let user: any = auth.currentUser;
	const [ editMode, setEditMode ] = React.useState(false);
	const [ changePhotoMode, setChangePhotoMode ] = React.useState(false);
	const global = React.useContext(GlobalContext);
	const [ goBackHandler, setGoBackHandler ] = React.useState(false);

	const updateProfile = () => {
		user
			.updateProfile({
				displayName: global.editedName,
				photoURL: global.uploadedImgUrl
			})
			.then(() => {
				console.log('Profile Updated');
				setEditMode(false);
			})
			.catch((err: any) => alert(err.message));

		global.editedEmail !== user.email
			? user
					.updateEmail(global.editedEmail)
					.then(() => {
						console.log('email updated');
						global.setEditedEmail(user.email);
					})
					.catch((err: any) => alert(err.message))
			: null;

		global.updateUserDB(global.editedName, global.editedEmail, global.userUID, global.uploadedImgUrl);
	};

	const editModeStart = () => {
		setEditMode(true);
		user.displayName ? global.setEditedName(user.displayName) : global.setEditedName('');
		global.setEditedEmail(user.email);
	};

	return (
		<React.Fragment>
			{global.userName ? null : <div className="box">Don't forget to update your profile!</div>}
			{goBackHandler ? <Redirect to="/dashboard" /> : null}
			{editMode ? (
				<div className="box">
					{user != null ? (
						<React.Fragment>
							<img className="userPhoto" src={user.photoURL ? user.photoURL : user_icon} width="300px" />
							<br />
							<button onClick={() => setChangePhotoMode(true)}>Change Photo</button>
							<br />
							{changePhotoMode ? <ImgUpload /> : null}

							<input
								type="text"
								value={global.editedName}
								onChange={(e) => global.setEditedName(e.target.value)}
							/>
							<input
								type="text"
								value={global.editedEmail}
								onChange={(e) => global.setEditedEmail(e.target.value)}
							/>
							<br />
							{global.editedEmail}
							<br />
							<button onClick={updateProfile}>Update Profile</button>
							<button onClick={() => setEditMode(false)}>Go Back</button>
						</React.Fragment>
					) : null}
				</div>
			) : (
				<div className="box">
					{user != null ? (
						<React.Fragment>
							<img className="userPhoto" src={user.photoURL ? user.photoURL : user_icon} width="300px" />
							<br />
							<p>Name: {user.displayName}</p>
							<p>m@il: {global.email}</p>
							<button onClick={() => editModeStart()}>Edit Profile</button>
							{global.userName ? (
								<button onClick={() => setGoBackHandler(true)}>Go Back</button>
							) : (
								<div>
									<br />
									<p>Update your profile first.</p>
								</div>
							)}
						</React.Fragment>
					) : null}
				</div>
			)}
		</React.Fragment>
	);
};
