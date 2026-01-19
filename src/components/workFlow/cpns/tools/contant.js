const PROCESS = "Process_";
const PROCESS_NAME = "业务流程_";
const ACTIVITY = "Activity_";
const SERIALNUMBER_KEY = "serialNumber";
const NORMAL_TASK_FACTORY = "normal_task_factory";
const CUSTOMER_TASK_FACTORY = "customer_task_factory";
const JOB_MANUAL_APPROVAL = "job_manual_approval";
const JOB_AUTOMATIC_CONSENT = "job_automatic_consent";
const JOB_AUTOMATIC_REJECT = "job_automatic_reject";
const INVALID_FACTORY_EXCEPTION = "该标识不存在任务工厂标识集合中";
const INVALID_MONITOR_NUMBER = "监听器序列号自动生成,无需设置";
const INVALID_MONITOR_FIELD = "非法监听器属性设置-";
const INVALID_MONITOR_INJECT_FIELD = "非法监听器字段注入属性设置-";
const INVALID_MONITOR_REMOVE = "无效的监听器移除,原因:不存在监听器";
const INVALID_EXTENSION_REMOVE = "无效的扩展属性移除,原因:不存在扩展属性";
const INDEX_OUT_OF_BOUNDS = "索引越界:";
const INVALID_APPROVAL_HUMAN = "非法的审批人:";
const INVALID_APPROVAL_MODE = "非法的审批方式:";
const INVALID_NO_APPROVAL_HUAMN = "非法的审批人为空:";
const INVALID_APPROVAL_TASK = "非法的审批任务实例对象:";

const INVALID_OPERATION_METHOD = "实例对象该方法已被重写,不具备该功能...:";

// 制定人
const APPROVAL_NOMINATOR = "approval_nominator";
// 发起人自己
const APPROVAL_SELF = "approval_self";
// 主管
const APPROVAL_MANAGER = "approval_manager";
// 候选人
const APPROVAL_CANDIDATE = "approval_candidate";
// 候选角色
const APPROVAL_CANDIDATE_ROLE = "approval_candidate_role";
// 表单管理员
const APPROVAL_ADMIN = "approval_admin";
// 表单角色
const APPROVAL_FORM_ROLE = "approval_form_role";

// 审批方式
const APPROVAL_ALL_AGRESS_MODE = "approval_all_agress_mode";
const APPROVAL_OR_AGRESS_MODE = "approval_or_agress_mode";

// 审批人为空时选项
const NO_APPROVAL_AUTO_PASS = "no_approval_auto_pass";
const NO_APPROVAL_AUTO_REJECT = "no_approval_auto_reject";
const NO_APPROVAL_APPOINT = "no_approval_appoint";

export {
  PROCESS,
  ACTIVITY,
  PROCESS_NAME,
  SERIALNUMBER_KEY,
  CUSTOMER_TASK_FACTORY,
  INVALID_MONITOR_REMOVE,
  JOB_MANUAL_APPROVAL,
  JOB_AUTOMATIC_CONSENT,
  JOB_AUTOMATIC_REJECT,
  NORMAL_TASK_FACTORY,
  INDEX_OUT_OF_BOUNDS,
  INVALID_MONITOR_FIELD,
  INVALID_MONITOR_NUMBER,
  INVALID_FACTORY_EXCEPTION,
  INVALID_EXTENSION_REMOVE,
  INVALID_MONITOR_INJECT_FIELD,
  APPROVAL_NOMINATOR,
  APPROVAL_SELF,
  APPROVAL_MANAGER,
  APPROVAL_CANDIDATE,
  APPROVAL_CANDIDATE_ROLE,
  APPROVAL_ADMIN,
  APPROVAL_FORM_ROLE,
  INVALID_APPROVAL_HUMAN,
  APPROVAL_ALL_AGRESS_MODE,
  APPROVAL_OR_AGRESS_MODE,
  INVALID_APPROVAL_MODE,
  INVALID_NO_APPROVAL_HUAMN,
  NO_APPROVAL_AUTO_PASS,
  NO_APPROVAL_AUTO_REJECT,
  NO_APPROVAL_APPOINT,
  INVALID_OPERATION_METHOD,
  INVALID_APPROVAL_TASK,
};
