import React from 'react';
import { Radio } from 'antd';
import { ProgressBar } from '../../../../common/new-component/NewComponent';
const RadioGroup = Radio.Group;

/*合同导入第三步*/
const ThirdStep = ({
    followRecordImportModalButtonLoading,       //合同导入按钮加载状态
    LastStepRadioOnChange,                      //第三步单选框onChange事件
}) => {

    let radioStyle = {
        marginBottom : 10
    }

    return (
        <div style = {{ marginBottom : 20 }}>
            { followRecordImportModalButtonLoading ?
                <ProgressBar content = '合同导入中' height = '50px'/>
                :
                <div style={{ color:'red' , fontWeight : '600' }}>是否确认导入</div>
            }
		</div>
    );
};

export default ThirdStep;
