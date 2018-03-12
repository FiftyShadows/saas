import React from 'react';
import { Modal, Input, Button, Steps, Tabs, Upload } from 'antd';
import TenantOrgFilter from '../../../../../pages/common/tenant-org-filter/TenantOrgFilter';
import { getSsToken } from '../../../../../utils/getSsToken';
import styles from './FirstStep.less';
const Step = Steps.Step;

/*跟进记录导入第一步*/
const FirstStep = ({
    followRecordImportOrgId,                    //批量导入时选择校区ID
    followRecordImportModalExcelName,           //合同导入上传文件名

    FirstStepOrgOnChange,                       //选择校区onChange事件
    FirstStepUploadOnChange,                    //选择文件onChange事件
    FirstStepDownLoadDataModal,                 //点击下载数据模板
}) => {

    //上传文件
	let uploadProps = {
		name	: 'file',
		action	: `${BASE_URL}/commRecordInfoImport/uploadExcel`,
		accept 	: '.xlsx' || '.xls',
		data 	: {
            orgId : followRecordImportOrgId,
            sstoken : getSsToken()
		},
		showUploadList : false,
		onChange:(info) => FirstStepUploadOnChange(info),
	};

    return (
        <div className={styles.first_step}>
            <TenantOrgFilter onChange={ FirstStepOrgOnChange } width='280px' value={ followRecordImportOrgId } />
            <div>
                <Input  placeholder = "Basic usage"
						value = { followRecordImportModalExcelName }
						disabled = { true }
						style = {{
							float : 'left',
							width : '200px',
					    	border: '0px',
							borderRadius: '5px 0px 0px 5px',
							borderTop: '1px solid #d9d9d9',
							borderBottom: '1px solid #d9d9d9',
							borderLeft: '1px solid #d9d9d9',
							color : '#666',
						}}
					/>
                <Upload {...uploadProps}>
					<Button type="primary" style={{borderRadius : '0px 5px 5px 0px', float : 'left'}}>选择文件</Button>
				</Upload>
            </div>
            {/*<p>请下载<a onClick = { FirstStepDownLoadDataModal }>数据模板</a>来准备数据后上传</p>/*/}
		</div>
    );
};

export default FirstStep;
