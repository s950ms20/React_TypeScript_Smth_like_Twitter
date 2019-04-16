import * as React from 'react';
import { db } from '../fb';

interface Props {}

interface State {
	data: firestoreDoc[];
}

type firestoreDoc = {
	title: string;
	content: string;
	author: string;
	id: string;
};

export class ClassComponent extends React.Component<Props, State> {
	state: State = {
		data: []
	};

	componentDidMount() {
		let dataContainer: firestoreDoc[] = [];
		// db
		// 	.collection('posts')
		// 	.get()
		// 	.then((querySnapshot) => {
		// 		querySnapshot.forEach((doc) => {
		// 			const singleDoc: firestoreDoc = {
		// 				title: doc.data().title,
		// 				content: doc.data().content,
		// 				author: doc.data().author,
		// 				id: doc.id
		// 			};

		// 			dataContainer.push(singleDoc);

		// 			this.setState({
		// 				data: dataContainer
		// 			});
		// 			console.log(this.state.data);
		// 		});
		// 	})
		// 	.catch((error: any) => {
		// 		console.log(error.message);
		//     });

		db.collection('posts').onSnapshot((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				this.setState({
					data: []
				});

				const singleDoc: firestoreDoc = {
					title: doc.data().title,
					content: doc.data().content,
					author: doc.data().author,
					id: doc.id
				};

				dataContainer.push(singleDoc);

				this.setState({
					data: dataContainer
				});
			});
		});

		////////////////////////

		// db.collection('posts').onSnapshot((snapshot) => {
		// 	snapshot.docChanges().forEach((change) => {
		// 		if (change.type === 'added') {
		// 			const singleDoc: firestoreDoc = {
		// 				title: change.doc.data().title,
		// 				content: change.doc.data().content,
		// 				author: change.doc.data().author,
		// 				id: change.doc.id
		// 			};

		// 			dataContainer.push(singleDoc);

		// 			this.setState({
		// 				data: dataContainer
		// 			});
		// 			if (change.type === 'modified') {
		// 				this.setState({
		// 					data: []
		// 				});

		// 				const singleDoc: firestoreDoc = {
		// 					title: change.doc.data().title,
		// 					content: change.doc.data().content,
		// 					author: change.doc.data().author,
		// 					id: change.doc.id
		// 				};

		// 				dataContainer.push(singleDoc);

		// 				this.setState({
		// 					data: dataContainer
		// 				});
		// 			}
		// 			if (change.type === 'removed') {
		// 				const singleDoc: firestoreDoc = {
		// 					title: change.doc.data().title,
		// 					content: change.doc.data().content,
		// 					author: change.doc.data().author,
		// 					id: change.doc.id
		// 				};

		// 				dataContainer.push(singleDoc);

		// 				this.setState({
		// 					data: dataContainer
		// 				});
		// 			}
		// 		}
		// 	});
		// });
	}

	componentWillUnmount() {}

	render() {
		return (
			<React.Fragment>
				<div className="box">
					{this.state.data.map((dt: firestoreDoc, idx: number) => {
						return (
							<div className="box" key={idx}>
								{dt.title}
								<br />
								{dt.content}
								<br />
								created by {dt.author}
							</div>
						);
					})}
				</div>
			</React.Fragment>
		);
	}
}
