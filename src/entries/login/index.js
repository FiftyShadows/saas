import './index.html';
import dva from 'dva';
import 'antd/dist/antd.min.css';
import '../../utils/request';
import '../index/index.css';
import './login.css';
import '../../assets/iconfont/iconfont.css';
import { message } from 'antd';

window.BASE_URL = window.BASE_URL||'/saas-web';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

message.config({
  duration: 3,
});

// 1. Initialize
const app = dva();

// 2. Model
app.model(require('../../models/login/login-page/loginPageModel'));    //登陆界面model
app.model(require('../../models/login/login-page/accountActiveModel'));    //登陆界面激活账号model
app.model(require('../../models/index/common/veryCodeButtonModel'));    //发送验证码model

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
