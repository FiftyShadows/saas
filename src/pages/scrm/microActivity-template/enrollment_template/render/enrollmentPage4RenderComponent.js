import React from 'react';

let EnrollmentPage5RenderComponent = React.createClass({
	getInitialState() {
		return {

		}
	},
	render(){
		let { detailData } = this.props;
		return (
			<div className="page-render-design enrollment-page4-render-design">
				<div className="enrollment-page4-title">
					{ detailData ? detailData.title : "" }
				</div>
				<div className = "enrollment-page4-content-item1">
					<img className="enrollment-page4-content-item-image" src={ (detailData && detailData.img_intro) ? detailData.img_intro[0].imgurl : ""} />
				</div>
				<div className = "enrollment-page4-content-item2">
					<img className="enrollment-page4-content-item-image" src={ (detailData && detailData.img_intro) ? detailData.img_intro[1].imgurl : ""} />
				</div>

				<div className="enrollment-page4-content-value">
					{ detailData ? detailData.intro : "" }
				</div>
			</div>
		)
	}
});

export default EnrollmentPage5RenderComponent;
