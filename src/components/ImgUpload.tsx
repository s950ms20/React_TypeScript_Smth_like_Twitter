import * as React from 'react';
import { storage } from '../fb';
import { GlobalContext } from '../state/GlobalContext';

interface Props {}

export const ImgUpload: React.FC<Props> = (props) => {
	const [ Imgs, setImgs ] = React.useState<any>([]);

	const [ ImgUrl, setImgUrl ] = React.useState('');

	const global = React.useContext(GlobalContext);

	const addImg = () => {
		const file = Imgs[0];
		const randomName: string = Math.floor(Math.random() * 1000000) + '.jpg';
		const filePath: string = '/imgs/' + randomName;
		const storageRef = storage.ref(filePath);
		storageRef.put(file);

		setTimeout(
			() =>
				storageRef
					.getDownloadURL()
					.then((url) => {
						console.log(url);
						setImgUrl(url);
						global.setUploadedImgUrl(url);
					})
					.catch((err) => console.log(err.message_)),
			1000
		);
	};

	return (
		<React.Fragment>
			<div>
				<h2>Img Uploader</h2>
				{ImgUrl ? <img src={ImgUrl} className="img" /> : null}
				<br />
				<input type="file" onChange={(event) => setImgs(event.target.files)} />
				<br />
				<button onClick={addImg}>Add Image</button>
				<button onClick={() => setImgUrl('')}>Clear</button>
			</div>
		</React.Fragment>
	);
};
