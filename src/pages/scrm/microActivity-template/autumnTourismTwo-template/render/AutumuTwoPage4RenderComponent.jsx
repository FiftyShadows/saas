import React from 'react';
import styles from '../AutumuTwo_tenmplate.less';

let ChildrenDayPage4RenderComponent = React.createClass({
	getInitialState() {
		return {

		}
	},

	render(){

		let { detailData } = this.props;

		let cover1  = detailData.img_intro&&detailData.img_intro.length > 0 ? `url(${detailData.img_intro[0].imgurl})` : '';
		let cover2 = detailData.img_intro&&detailData.img_intro.length > 1 ? `url(${detailData.img_intro[1].imgurl})` : '';

		return (
			<div className="autumn_two">
				<div className={styles.page4_background}>
					<div className={styles.pageFourTopSunImage}></div>
					<div className={styles.pageFourTitleText}>{detailData.title || ''}</div>
					<div className={styles.pageFourCoverImage} style={{backgroundImage : cover1}}></div>
					<div className={styles.pageFourCoverImage} style={{backgroundImage : cover2}}></div>
					<div className={styles.pageFourBottomImage}></div>
				</div>
			</div>
		)
	}
});

export default ChildrenDayPage4RenderComponent;
