import * as React from 'react';
import { GlobalContext } from '../state/GlobalContext';
import { ImgUpload } from './ImgUpload';

interface Props {}

export const AddNewPost: React.FC<Props> = (props) => {
	const global = React.useContext(GlobalContext);

	return (
		<React.Fragment>
			{global.minimizeToIconNewPost ? null : (
				<div className="box" onClick={global.newDocId}>
					<input
						type="text"
						placeholder="Title......."
						value={global.title}
						onChange={(e) => global.setTitle(e.target.value)}
					/>
					<br />
					<textarea
						className="content"
						placeholder="Content..."
						value={global.content}
						onChange={(e) => global.setContent(e.target.value)}
					/>
					<br />
					<ImgUpload />
					<br />
					<button onClick={global.add}>Add</button>
					<button onClick={global.lorem}>Lorem Ipsum</button>
					<button onClick={global.clear}>Clear</button>
				</div>
			)}
		</React.Fragment>
	);
};
