import {
  JOB_MANUAL_APPROVAL,
  JOB_AUTOMATIC_REJECT,
  JOB_AUTOMATIC_CONSENT,
} from "./contant";
import Assert from "./Assert";
import BusinessException from "./BusinessException";
import JobManualApproval from "./JobManualApproval";
import JobAutomaticConsent from "./JobAutomaticConsent";
import JobAutomaticReject from "./JobAutomaticReject";

/**
 * 生成基础任务工厂类
 *
 */
class GenerateBaseJobFactory {
  /**
   * 任务工厂的映射
   * key: JobMark
   * val: Job Class
   */
  static jobFactoryMap = new Map([
    [JOB_MANUAL_APPROVAL, JobManualApproval],
    [JOB_AUTOMATIC_CONSENT, JobAutomaticConsent],
    [JOB_AUTOMATIC_REJECT, JobAutomaticReject],
  ]);

  /**
   * 获取任务工厂的映射
   */
  static getJobFactoryMap(jobMark) {
    Assert.NonNullAndUndefined(jobMark, "请按照规范选择任务的类型...");
    // 如果不存在工厂,则抛出异常
    if (!this.jobFactoryMap.keys().toArray().includes(jobMark)) {
      BusinessException.invalidFactoryException(jobMark);
    }
    // 获取任务工厂实例对象
    const JobFactoryInstance = this.jobFactoryMap.get(jobMark);
    // 返回工厂实例对象
    return new JobFactoryInstance();
  }

  /**
   * 根据工厂唯一标记获取工厂
   * @param {*} jobMark
   * @returns 返回任务实例对象
   */
  static getJobFactory(jobMark) {
    return this.getJobFactoryMap(jobMark);
  }

  /**
   * 根据任务工厂的唯一标识,生成对应的任务参数
   * @param {*} jobMark 工厂唯一标识
   */
  static generateJob(jobMark) {
    return this.getJobFactory(jobMark);
  }
}

export default GenerateBaseJobFactory;
