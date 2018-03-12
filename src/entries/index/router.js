import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'dva/router';

/***********************************基础配置*******************************************************************************************/
import IndexLayoutPage                          from '../../pages/layout/index-layout/IndexLayoutPage';
import MainLayout                               from '../../pages/common/main-layout/MainLayout';
import CommonLayout                             from '../../pages/common/common-layout/CommonLayout';
import Home        		                        from '../../pages/home/HomeLayout';
import NotFound                                 from '../../components/common/not-found/NotFound';

/***********************************CRM*********************************************************************************************/
import CrmOverview                              from '../../pages/crm/overview/CrmOverview'                                    //CRM首页
//名单跟进
import LeadsFollow                              from '../../pages/crm/leads-follow/LeadsFollow';                               //CRM leads跟进
import LeadsDispatch                            from '../../pages/crm/leads-follow/LeadsDispatch';                             //CRM leads分配
import LeadsAdd                                 from '../../pages/crm/leads-follow/LeadsAdd';                                  //CRM leads添加
//跟进记录
import FollowRecordPage                         from '../../pages/crm/follow-record/FollowRecordPage';                         //CRM 跟进记录
//到访管理
import VisitRecordPage                          from '../../pages/crm/visit-record/VisitRecordPage';                           //CRM 到访管理
//线下预约试听
import OfflinebookingPage                       from '../../pages/crm/offline-booking/OfflinebookingPage';                     // 预约试听
//会员卡管理
import VipManagePage                            from '../../pages/crm/vip-manage/VipManagePage';                               //CRM vip管理
import UseClassPage                             from '../../pages/crm/vip-manage/UseClassPage';                                //CRM 手动消课记录
import SendClassHourPage                        from '../../pages/crm/vip-manage/SendClassHourPage';                           //CRM vip赠课时
import VipTransCoursePage                       from '../../pages/crm/vip-manage/VipManagePage';                               //CRM 转课记录
//学员管理
import StuManagementPage                        from '../../pages/crm/stuManagement/StuManagementPage';                        // 学员管理
//学员联系人
import ParentManage                             from '../../pages/crm/parent-manage/ParentManagePage';                         //联系人管理
//合同订单
import ContractOrderPage                        from '../../pages/crm/contract-order/ContractOrderPage';                       //CRM 合同订单
import ContractOrderReceiptListPage             from '../../pages/crm/contract-order/ContractOrderReceiptListPage';            //CRM 合同收款单列表
import DepositManage                            from '../../pages/crm/contract-order/DepositManage';                           //CRM 合同定金管理列表
//退款单
import NewRefundForm                            from '../../pages/crm/new-refund-form/NewRefundForm';                          //CRM 新退款单
//销售产品
import ClassPackagePage                         from '../../pages/scrm/class-package/ClassPackagePage';                        //产品套餐
import TeachingMaterial   	                    from '../../pages/crm/teaching-material/TeachingMaterial';                     //增值服务

/***********************************工单*********************************************************************************************/
import WorkOrder                                from '../../pages/work-order/WorkOrder';                                        //工单

/***********************************早教类erp*********************************************************************************************/
import CerpOverview                             from '../../pages/cerp/cerp-overview/Overview';                                //saas3.2.0cerp首页
import CourseAlertList                          from '../../pages/cerp/course-alert-list/CourseAlertList';                     //cerp续费提醒
import FollowCoursePrint                        from '../../pages/cerp/print-file/follow-course-print/FollowCoursePrint';      //cerp按课程打印签到表
import NewFollowCoursePrint                     from '../../pages/cerp/print-file/new-follow-course-print/NewFollowCoursePrint';      //cerp新按课程打印签到表
import SchedulePrintByDay                       from '../../pages/cerp/print-file/schedule-print-by-day/SchedulePrintByDay';   //cerp按天打印签到表
//课程班级教室
import CerpCourseManage		                    from '../../pages/cerp/courseManage/CourseManage';                             //教学2-课程管理
import ClassManagePage		                    from '../../pages/cerp/class-manage/ClassManagePage';                          //教学2-班级管理
import CerpClassroom                            from '../../pages/cerp/classroom/Classroom';                                   //教学2-教室管理
//排课管理
import CreateArrangeCourse                      from '../../pages/cerp/new-arrange-course/CreateArrangeCourse';                //saas3.2.0新增排课
import NewArrangeCourseTable                    from '../../pages/cerp/new-arrange-course/NewArrangeCourse';                   //saas3.2.0排课列表
//约课管理
import OrderClassPage                           from '../../pages/erp/order-class/OrderClassPage';                             //约课管理 约课
import OrderRecordPage                          from '../../pages/erp/order-class/OrderRecordPage';                            //约课管理 约课
import OrderClassScheduleMgrPage                from '../../pages/erp/order-class/OrderClassScheduleMgrPage';                  //约课管理 课程表
//考勤管理
import StuAttendancePages                       from '../../pages/erp/stu-attendance/StuAttendancePages'                       //学员考勤/我的考勤
import StudentWorks                             from '../../pages/erp/student-works/StudentWorksPage';                         //学员作品
import ParentsNotice                            from '../../pages/erp/parents-notice/ParentsNotice';                           //家校通知
import HomeSchoolComment                        from '../../pages/cerp/home-school-comment/HomeSchoolComment';                 //家校互评
import VacateManagePage                         from '../../pages/cerp/vacate-manage/VacateManagePage';                        //请假记录

/***********************************报表**********************************************************************************************/
//销售表
import SalesWorkSheet                           from '../../pages/report-form/sales-report/sales-work-sheet/SalesWorksheet';                    //销售工作表
import SalesAchievementSheet                    from '../../pages/report-form/sales-report/sales-achievement-sheet/SalesAchievementSheet';      //销售业绩表
import LeadsSourceSheet                         from '../../pages/report-form/sales-report/leads_source_sheet/LeadsSourceSheet';                //名单来源表
import LeadsFollowSheet                         from '../../pages/report-form/sales-report/leads_follow_sheet/LeadsFollowSheet';                //名单跟进表
import SendRecordSheetPage                      from '../../pages/report-form/sales-report/send-record-sheet/SendRecordSheetPage';              //赠课记录表
import ContractIncomeSheetPage                  from '../../pages/report-form/sales-report/contract-income-sheet/ContractIncomeSheetPage';      //合同收入表

//教学表
import StuAttendanceSheet                       from '../../pages/report-form/teaching-report/stu-attendance-sheet/StuAttendanceSheet';         //学员考勤表
import ClassRoomRatioSheet                      from '../../pages/report-form/teaching-report/class-room-ratio-sheet/ClassRoomRatioSheet';      //教室利用率表
import StuUseClassChartPage                     from '../../pages/report-form/teaching-report/stu-use-class-sheet/StuUseClassChartPage';        //学员消课表
import StuSilenceSheetPage                      from '../../pages/report-form/teaching-report/stu-silence-sheet/StuSilenceSheetPage';           //学员沉默表
import TeacherTeaching	                        from '../../pages/report-form/teaching-report/teacher-teaching/TeacherTeaching';                //老师授课报表
import CourseDetailSheet	                    from '../../pages/report-form/teaching-report/course-detail-sheet/CourseDetailSheet';           //课时详情报表
import TeacherSalarySheet	                    from '../../pages/report-form/teaching-report/teacher-salary-sheet/TeacherSalarySheet';         //老师工资报表

/***********************************设置**********************************************************************************************/
//系统设置
import RoleManage 	                            from '../../pages/system/role-manage/RoleManage';                               //角色管理
import StaffManage 	                            from '../../pages/system/staff-manage/StaffManage';                             //员工管理
import SystemDicDataMaintenance 	            from '../../pages/system/Maintenance';                                          //业务参数
import AccountCard   		                    from '../../pages/system/account-card/AccountCard';                             //收付款账号
import checkOnWorkAttendance                    from '../../pages/system/check-on-work-attendance/checkOnWorkAttendancePage' ;  //考勤设置
import SecuritySettings                         from '../../pages/system/security-settings/SecuritySettingsPage';               //安全设置
import ClassScheduleTimeSet                     from '../../pages/system/class-schedule-time-set/ClassScheduleTimeSet';         //课程表时间设置
import CourseNumAlert                           from '../../pages/system/course-num-alert/CourseNumAlert';                      //课时预警设置
import DomainNameSetting                        from '../../pages/system/domain-name-setting/DomainNameSetting';                //三级域名设置
import SalarySet                                from '../../pages/system/salary-set/SalarySet';                                 //工资设置
//小票设置
import AttendancePrint                          from '../../pages/system/small-ticket-set/AttendancePrint';                     //考勤打印
import SignInPrint                              from '../../pages/system/small-ticket-set/SignInPrintPage';                        //签到打印
//校区设置
import OrgLogo                                  from '../../pages/system/org-set/org-logo/OrgLogo';                             //机构logo
import OrgManage                                from '../../pages/system/org-set/org-manage/OrgManage';                         //机构管理
//短信业务
import MessagePage                              from '../../pages/system/message/MessagePage';                                  //短信记录
//公海池设置
import leadRecordNoRule                         from '../../pages/system/gong-hai-set/lead-record-no-rule/leadRecordNoRule' ;   //无跟进记录名单规则
import haveMaxList                              from '../../pages/system/gong-hai-set/have-max-list/haveMaxListPage' ;          //最大拥有名单数
import CheckSameRule                            from '../../pages/system/gong-hai-set/check-same-rule/CheckSameRule';           //查重规则
import AccountDetails                           from '../../pages/system/payment-center/account-details/AccountDetailsPage';    //账户明细

//口碑游戏库
import KoubeiGame                               from '../../pages/scrm/koubei-game/koubei-micro-game';              //游戏库
import MyKoubeiGame                             from '../../pages/scrm/koubei-game/my-koubei-game';                 //我的游戏
import CourseIntroducePage                      from '../../pages/scrm/course-introduce/CourseIntroducePage';   //课程介绍


/***********************************未知**********************************************************************************************/
import StudentManage           from '../../pages/erp/student-manage/StudentManage';
import StudentDetail           from '../../pages/erp/student-detail/StudentDetail';

/***********************************公共界面**********************************************************************************************/
import CountDownPage	from '../../pages/common/count-down-ms/CountDownMsPage';			//倒计时请求

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexLayoutPage} >

        <Route path="crm" component={CommonLayout} breadcrumbName="CRM" >
            <Route path="/crm_homepage" component={CrmOverview} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_homepage')}/>
			<Route breadcrumbName="未付费客户">
                <Route path="/crm_leads_all" breadcrumbName="全部未付费客户" component={LeadsFollow} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_leads_all')}  />
                <Route path="/crm_leads_mine" breadcrumbName="我的未付费客户" component={LeadsFollow} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_leads_mine')}  />
                <Route path="/crm_leads_recycle" breadcrumbName="回收站" component={LeadsFollow} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_leads_recycle')}  />
                <Route path="/crm_leads_sea" breadcrumbName="公海池" component={LeadsFollow} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_leads_sea')}  />
                <Route path="/crm_leads_assign" breadcrumbName="未付费客户分配" component={LeadsDispatch} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_leads_assign')}  />
                <Route path="/crm_leads_add" breadcrumbName="添加未付费客户" component={LeadsAdd} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_leads_add')}  />
            </Route>
			<Route breadcrumbName="线下预约试听">
                <Route path="/crm_rsv_all" breadcrumbName="全部试听" component={OfflinebookingPage} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_rsv_all')} />
                <Route path="/crm_rsv_mine" breadcrumbName="全部试听" component={OfflinebookingPage} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_rsv_mine')} />
            </Route>
			<Route breadcrumbName="跟进记录">
                <Route path="/crm_follow_all" breadcrumbName="全部记录" component={ FollowRecordPage } onEnter={()=> changeLeftMenu && changeLeftMenu('crm_follow_all')} />
                <Route path="/crm_follow_mine" breadcrumbName="我跟进的记录" component = { FollowRecordPage } onEnter={()=> changeLeftMenu && changeLeftMenu('crm_follow_mine')} />
            </Route>
			<Route breadcrumbName="到访管理">
                <Route path="/crm_visit_all" breadcrumbName="全部到访" component={ VisitRecordPage } onEnter={()=> changeLeftMenu && changeLeftMenu('crm_visit_all')} />
                <Route path="/crm_visit_mine" breadcrumbName="我负责的到访" component = { VisitRecordPage } onEnter={()=> changeLeftMenu && changeLeftMenu('crm_visit_mine')} />
            </Route>
            <Route breadcrumbName="付费客户">
                <Route path="/crm_stu_alllist" breadcrumbName="全部客户" component={StuManagementPage} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_stu_alllist')} />
                <Route path="/crm_stu_list" breadcrumbName="我负责的客户" component={StuManagementPage} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_stu_list')} />
            </Route>
            <Route breadcrumbName="联系人">
                <Route path="/crm_stuparent_list" breadcrumbName="全部联系人" component={ParentManage} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_stuparent_list')}/>
                <Route path="/crm_stuparent_mylist" breadcrumbName="我负责的联系人" component={ParentManage} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_stuparent_mylist')}/>
            </Route>
			<Route breadcrumbName="会员卡管理" >
				<Route path="/crm_card_mgr" breadcrumbName="会员卡" component = { VipManagePage } onEnter={()=> changeLeftMenu && changeLeftMenu('crm_card_mgr')} />
				<Route path="/crm_card_repealcourse" breadcrumbName="手动消课" component = { UseClassPage } onEnter={()=> changeLeftMenu && changeLeftMenu('crm_card_repealcourse')} />
                <Route path="/crm_card_give" breadcrumbName="赠课审核" component = { SendClassHourPage } onEnter={()=> changeLeftMenu && changeLeftMenu('crm_card_give')} />
                <Route path="/crm_card_transferlist" breadcrumbName="转课记录" component = { VipTransCoursePage } onEnter={()=> changeLeftMenu && changeLeftMenu('crm_card_transferlist')} />
			</Route>
			<Route breadcrumbName="合同订单">
                <Route path="/crm_sorder_alllist" breadcrumbName="全部合同" component={ ContractOrderPage } onEnter={()=> changeLeftMenu && changeLeftMenu('crm_sorder_alllist')}/>
				<Route path="/crm_sorder_list" breadcrumbName="我负责的合同" component={ContractOrderPage} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_sorder_list')}/>
				<Route path="/crm_sorder_checklist" breadcrumbName="审核合同" component={ContractOrderPage} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_sorder_checklist')}/>
				<Route path="/crm_sorder_collectionlist" breadcrumbName="合同收款" component={ContractOrderPage} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_sorder_collectionlist')}/>
				<Route path="/crm_sorder_receiptlist" breadcrumbName="收款单" component={ContractOrderReceiptListPage} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_sorder_receiptlist')}/>
                <Route path="/crm_sorder_deposit" breadcrumbName="订金管理" component={DepositManage} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_sorder_deposit')}/>
            </Route>
            <Route breadcrumbName="退款单">
                <Route path="/crm_rorder_alllist" breadcrumbName="全部退款" component={NewRefundForm} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_rorder_alllist')}/>
                <Route path="/crm_rorder_list" breadcrumbName="我负责的退款" component={NewRefundForm} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_rorder_list')}/>
                <Route path="/crm_rorder_checklist" breadcrumbName="审核退款" component={NewRefundForm} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_rorder_checklist')}/>
            </Route>
            <Route breadcrumbName="销售产品">
                <Route path="/crm_product_cost_list" breadcrumbName="产品套餐" component={ClassPackagePage} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_product_cost_list')}  />
                <Route path="/crm_product_teachaid_list" breadcrumbName="增值服务" component={TeachingMaterial} onEnter={()=> changeLeftMenu && changeLeftMenu('crm_product_teachaid_list')} />
                <Route path="/cerp_kcjs_course" breadcrumbName="模块管理" component={CerpCourseManage} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_kcjs_course')} />
            </Route>
        </Route>

        <Route path="word-order" component={CommonLayout} breadcrumbName="工单中心" >
            <Route path="/workorder_allwo" breadcrumbName="全部工单" component={WorkOrder} onEnter={()=> changeLeftMenu && changeLeftMenu('workorder_allwo')}/>
            <Route path="/workorder_mywo" breadcrumbName="我的工单" component={WorkOrder} onEnter={()=> changeLeftMenu && changeLeftMenu('workorder_mywo')}/>
        </Route>

        <Route path="cerp" component={CommonLayout} breadcrumbName="教学" >
            <Route path="/cerp_homepage" component={CerpOverview} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_homepage')}/>
            <Route path="/course_alert_list" breadcrumbName="续费提醒" component={CourseAlertList} onEnter={()=> changeLeftMenu && changeLeftMenu('course_alert_list')}/>
            <Route path="/follow_course_print" breadcrumbName="按课程打印签到表" component={FollowCoursePrint} onEnter={()=> changeLeftMenu && changeLeftMenu('follow_course_print')}/>
            <Route path="/cerp_jw_signprint" breadcrumbName="按课程打印签到表" component={NewFollowCoursePrint} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_jw_signprint')}/>
            <Route path="/schedule_print_by_day" breadcrumbName="按天打印课程表" component={SchedulePrintByDay} onEnter={()=> changeLeftMenu && changeLeftMenu('schedule_print_by_day')}/>
            <Route breadcrumbName="课程班级教室">
                {/*<Route path="/cerp_kcjs_course" breadcrumbName="课程管理" component={CerpCourseManage} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_kcjs_course')} />*/}
                <Route path="/cerp_kcjs_class" breadcrumbName="班级管理" component={ClassManagePage} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_kcjs_class')} />
                <Route path="/cerp_kcjs_room" breadcrumbName="教室管理" component={CerpClassroom} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_kcjs_room')}/>
            </Route>
            <Route breadcrumbName="排课管理">
                    <Route path="/cerp_cp_mgr" breadcrumbName="排课" component={CreateArrangeCourse} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_cp_mgr')}/>
                    <Route path="/cerp_cp_rcd" breadcrumbName="排课记录" component={NewArrangeCourseTable} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_cp_rcd')}/>
            </Route>
			<Route breadcrumbName="约课管理">
                <Route path="/cerp_yk_listmgr" breadcrumbName="约课列表" component={OrderClassPage} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_yk_listmgr')} />
                <Route path="/cerp_yk_mgr" breadcrumbName="约课课程表" component={OrderClassScheduleMgrPage} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_yk_mgr')} />
                <Route path="/cerp_yk_rcd" breadcrumbName="学员约课记录" component={OrderRecordPage} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_yk_rcd')} />
            </Route>
			<Route breadcrumbName="教务管理">
				<Route path="/erp_stu_work_list" breadcrumbName="学员作品" component={StudentWorks} onEnter={()=> changeLeftMenu && changeLeftMenu('erp_stu_work_list')} />
                <Route path="/cerp_jw_check" breadcrumbName="学员考勤" component={StuAttendancePages} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_jw_check')} />
                <Route path="/cerp_jw_mycheck" breadcrumbName="我的考勤" component={StuAttendancePages} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_jw_mycheck')} />
                <Route path="/cerp_jw_vocation" breadcrumbName="请假记录" component={VacateManagePage} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_jw_vocation')} />
                <Route path="/cerp_homeschool_comm" breadcrumbName="家校互评" component={HomeSchoolComment} onEnter={()=> changeLeftMenu && changeLeftMenu('cerp_homeschool_comm')} />
            </Route>
        </Route>

        <Route path="report" component={CommonLayout} breadcrumbName="报表" >
            <Route breadcrumbName="销售报表">
                <Route path="/report_crm_sellerwork" breadcrumbName="销售工作表" component={SalesWorkSheet} onEnter={()=> changeLeftMenu && changeLeftMenu('report_crm_sellerwork')}/>
                <Route path="/report_crm_sellscore" breadcrumbName="销售业绩表" component={SalesAchievementSheet} onEnter={()=> changeLeftMenu && changeLeftMenu('report_crm_sellscore')}/>
                <Route path="/report_crm_leadssource" breadcrumbName="名单来源表" component={LeadsSourceSheet} onEnter={()=> changeLeftMenu && changeLeftMenu('report_crm_leadssource')}/>
                <Route path="/report_crm_leadsfollow" breadcrumbName="名单跟进表" component={LeadsFollowSheet} onEnter={()=> changeLeftMenu && changeLeftMenu('report_crm_leadsfollow')}/>
                <Route path="/report_crm_extperiod" breadcrumbName="赠课记录表" component={SendRecordSheetPage} onEnter={()=> changeLeftMenu && changeLeftMenu('report_crm_extperiod')}/>
                <Route path="/report_crm_purchaseincome" breadcrumbName="合同收入表" component={ContractIncomeSheetPage} onEnter={()=> changeLeftMenu && changeLeftMenu('report_crm_purchaseincome')}/>
            </Route>
            <Route breadcrumbName="教学报表">
                <Route path="/report_erp_stucheck" breadcrumbName="学员考勤表" component={StuAttendanceSheet} onEnter={()=> changeLeftMenu && changeLeftMenu('report_erp_stucheck')}/>
                <Route path="/report_erp_roomuse" breadcrumbName="教室利用表" component={ClassRoomRatioSheet} onEnter={()=> changeLeftMenu && changeLeftMenu('report_erp_roomuse')}/>
                <Route path="/report_erp_stucost" breadcrumbName="学员消课表" component={StuUseClassChartPage} onEnter={()=> changeLeftMenu && changeLeftMenu('report_erp_stucost')}/>
                <Route path="/report_erp_stusilence" breadcrumbName="沉默学员表" component={StuSilenceSheetPage} onEnter={()=> changeLeftMenu && changeLeftMenu('report_erp_stusilence')}/>
                <Route path="/report_erp_teacher" breadcrumbName="老师授课表" component={TeacherTeaching} onEnter={()=> changeLeftMenu && changeLeftMenu('report_erp_teacher')}/>
                <Route path="/report_erp_costdetail" breadcrumbName="课时详情表" component={CourseDetailSheet} onEnter={()=> changeLeftMenu && changeLeftMenu('report_erp_costdetail')}/>
                <Route path="/report_erp_teacher_salary" breadcrumbName="老师工资表" component={TeacherSalarySheet} onEnter={()=> changeLeftMenu && changeLeftMenu('report_erp_teacher_salary')}/>
            </Route>
        </Route>

        <Route path="sys" component={CommonLayout} breadcrumbName="设置" >
            <Route breadcrumbName="系统设置">
                <Route path="/sys_scfg_role_list" breadcrumbName="角色管理" component={RoleManage} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_scfg_role_list')}/>
                <Route path="/sys_scfg_user_list" breadcrumbName="员工管理" component={StaffManage} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_scfg_user_list')}/>
                <Route path="/sys_scfg_param_set" breadcrumbName="业务参数" component={SystemDicDataMaintenance} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_scfg_param_set')}/>
                <Route path="/sys_scfg_payacct_list" breadcrumbName="收付款账号" component={AccountCard} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_scfg_payacct_list')}/>
                <Route path="/sys_cfg_sign" breadcrumbName="考勤设置" component={checkOnWorkAttendance} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_cfg_sign')}/>
                <Route path="/sys_scfg_safety" breadcrumbName="安全设置" component={SecuritySettings} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_scfg_safety')}/>
                <Route path="/sys_scfg_cptime" breadcrumbName="课程表时段" component={ClassScheduleTimeSet} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_scfg_cptime')}/>
                <Route path="/sys_scfg_pr" breadcrumbName="续费提醒" component={CourseNumAlert} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_scfg_pr')}/>
                <Route path="/sys_scfg_host" breadcrumbName="域名设置" component={DomainNameSetting} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_scfg_host')}/>
                <Route path="/sys_scfg_salary_set" breadcrumbName="工资设置" component={SalarySet} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_salary_set')}/>
            </Route>

            <Route breadcrumbName="校区设置">
                <Route path="/sys_org_logo_set" breadcrumbName="校区logo" component={OrgLogo} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_org_logo_set')}/>
                <Route path="/sys_org_list" breadcrumbName="校区管理" component={OrgManage} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_org_list')}/>
            </Route>

			<Route breadcrumbName="短信业务">
				<Route path="/sys_sms_record" breadcrumbName="短信记录" component={MessagePage} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_sms_record')}/>
			</Route>

            <Route breadcrumbName="小票设置">
				<Route path="/sys_rece_kq_list" breadcrumbName="考勤打印" component={AttendancePrint} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_rece_kq_list')}/>
                <Route path="/sys_ticket_sign" breadcrumbName="签到打印" component={SignInPrint} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_ticket_sign')}/>
			</Route>
            <Route breadcrumbName="公海池设置">
                <Route path="/sys_sea_follow" breadcrumbName="跟进名单规则" component={leadRecordNoRule} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_sea_follow')}/>
                <Route path="/sys_sea_maxnum" breadcrumbName="拥有名单数规则" component={haveMaxList} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_sea_maxnum')}/>
                <Route path="/sys_sea_repetrule" breadcrumbName="查重规则" component={CheckSameRule} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_sea_repetrule')}/>
            </Route>
            <Route breadcrumbName="支付中心">
                 <Route path="/sys_pay_account" breadcrumbName="账户明细" component={AccountDetails} onEnter={()=> changeLeftMenu && changeLeftMenu('sys_pay_account')}/>
            </Route>
        </Route>
        <Route path="other" component={CommonLayout} >
            <Route path="/*" breadcrumbName="未定义页面" component={NotFound} onEnter={()=> changeLeftMenu && changeLeftMenu('not_found')}/>
        </Route>
      </Route>
    </Router>
  );
}
