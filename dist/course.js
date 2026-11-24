(function (root) {
  'use strict';
  // Original teaching examples. These describe fictional engineering situations.
  const raw = [
`identify|v.|识别并确定|identify the root cause|We need to identify the root cause of the failure.|我们需要确定故障的根本原因。|比 find 更强调识别和确认。
specify|v.|明确规定|specify the requirements|Please specify the requirements before implementation.|请在实现之前明确需求。|specify what / how；名词 specification。
clarify|v.|澄清|clarify an assumption|Could you clarify this assumption?|你能澄清这项假设吗？|礼貌提问可用 Could you clarify ...?
distinguish|v.|区分|distinguish A from B|We must distinguish a software bug from a modeling error.|我们必须区分软件缺陷和建模错误。|distinguish A from B；也可用 distinguish between A and B。
interpret|v.|解释并理解|interpret the results|We should interpret the results with caution.|我们应谨慎解读这些结果。|interpret 不只是翻译，也指解读数据。`,
`consistent|adj.|一致的|consistent with the model|The observations are consistent with the model.|这些观测与模型一致。|consistent with；不等于已经证明模型正确。
ambiguous|adj.|有歧义的|an ambiguous description|An ambiguous description can lead to different implementations.|有歧义的描述可能导致不同的实现。|反义词 unambiguous。
explicit|adj.|明确表达的|an explicit requirement|The update frequency is an explicit requirement.|更新频率是一项明确要求。|也见 explicit methods；本课只练明确表达这个义项。
implicit|adj.|未明说的|an implicit assumption|The design relies on an implicit assumption.|该设计依赖一项未明说的假设。|也见 implicit methods；注意语境。
relevant|adj.|相关且有用的|relevant to the task|These measurements are relevant to the task.|这些测量与任务相关。|relevant to，不用 relevant with。`,
`indicate|v.|表明或指示|indicate a problem|The warning may indicate a timing problem.|这条警告可能表明存在时序问题。|indicate 不自动等于 prove。
suggest|v.|提示或提出建议|suggest an explanation|The results suggest that the delay matters.|这些结果提示延迟可能有影响。|suggest that；建议做事可用 suggest doing。
imply|v.|意味着或隐含|imply a limitation|Success in simulation does not imply success on hardware.|仿真成功并不意味着真机成功。|imply 是信息所暗示；infer 是读者推断。
demonstrate|v.|展示并用证据说明|demonstrate the effect|The experiment demonstrates the effect under these conditions.|该实验展示了这些条件下的影响。|结论要保留 under these conditions 等条件。
justify|v.|为某事提供依据|justify the choice|We need more evidence to justify this choice.|我们需要更多证据来说明这一选择合理。|justify doing something；名词 justification。`,
`assumption|n.|假设条件|make an assumption|We make an assumption about sensor noise.|我们对传感器噪声作出一项假设。|本词强调推理前提；hypothesis 常指待检验的假说。
constraint|n.|约束|satisfy a constraint|The trajectory must satisfy the velocity constraint.|该轨迹必须满足速度约束。|常用 satisfy / violate a constraint 表达满足或违反约束。
objective|n.|目标|define the objective|We should define the objective before choosing a method.|我们应在选择方法前定义目标。|作形容词也可表示客观的。
criterion|n.|判断标准|a selection criterion|Accuracy is one selection criterion.|准确性是一项选择标准。|单数 criterion，复数 criteria。
trade-off|n.|权衡取舍|a trade-off between speed and accuracy|There is a trade-off between speed and accuracy.|速度与准确性之间存在权衡。|名词 trade-off；动词 trade off。`,
`implement|v.|实现|implement a controller|We will implement a simple controller first.|我们将先实现一个简单的控制器。|implement an algorithm；implementation 是实现。
evaluate|v.|评估|evaluate performance|We evaluate performance under several test conditions.|我们在多种测试条件下评估性能。|evaluate something against criteria。
compare|v.|比较|compare A with B|We compare the new method with a baseline.|我们将新方法与基线作比较。|比较要说明条件和基准。
assess|v.|评定或判断|assess the risk|We must assess the risk before the hardware test.|我们必须在真机测试前评估风险。|assess 和 evaluate 有重叠，不硬分绝对边界。
validate|v.|确认是否满足预期用途|validate the model|We use independent measurements to validate the model.|我们用独立测量数据验证模型。|verify 常偏是否符合规格；validate 常偏预期用途，具体依项目。`,
`reproduce|v.|复现|reproduce the failure|Can you reproduce the failure with the same configuration?|你能用相同配置复现故障吗？|reproduce a result / an issue。
isolate|v.|隔离并缩小范围|isolate the cause|We disable one component to isolate the cause.|我们禁用一个组件以缩小原因范围。|isolate 在调试中指拆开变量和影响。
inspect|v.|检查|inspect the logs|Inspect the logs before changing the parameters.|先检查日志，再修改参数。|inspect 比笼统的 look at 更具体。
trace|v.|追踪|trace the data flow|We trace the data flow through the pipeline.|我们沿处理流程追踪数据流。|也可作名词：a stack trace。
resolve|v.|解决|resolve the issue|This change resolves the timing issue.|这项修改解决了时序问题。|resolve a conflict / an issue。`,
`discrepancy|n.|不一致或差异|a discrepancy between results|We found a discrepancy between the two results.|我们发现两组结果存在差异。|通常暗含本来预期更一致。
mismatch|n.|不匹配|a mismatch in dimensions|A mismatch in dimensions caused the error.|维度不匹配导致了这个错误。|名词 a mismatch；动词 dimensions do not match。
deviation|n.|偏差|deviation from the reference|The plot shows a deviation from the reference.|图中显示了相对参考值的偏差。|deviation from；与 standard deviation 标准差区分。
anomaly|n.|异常现象|detect an anomaly|The monitor detected an anomaly in the signal.|监测程序检测到信号中的异常。|异常需要调查，不自动等于故障。
failure|n.|故障或未成功|a failure mode|We documented a possible failure mode.|我们记录了一种可能的失效模式。|failure mode 比笼统 problem 更具体。`,
`configure|v.|配置|configure the environment|We configure the environment before running the test.|我们在运行测试之前配置环境。|configure something to do something。
initialize|v.|初始化|initialize the state|Initialize the state before the first update.|在首次更新前初始化状态。|不等同于安装 install。
integrate|v.|集成|integrate a component|We integrate the component into the existing system.|我们把该组件集成到现有系统中。|integrate A into B；另一义项是数学积分。
deploy|v.|部署|deploy the software|We deploy the software after validation.|我们在验证后部署软件。|部署并不自动意味着已完成真机安全确认。
maintain|v.|维护或保持|maintain compatibility|The update should maintain compatibility with existing tools.|该更新应保持与现有工具的兼容性。|maintain a system / a stable rate。`,
`feasible|adj.|可行的|a feasible solution|This solution is feasible within our time budget.|在我们的时间预算内，这一方案可行。|优化中 feasible 常指满足约束。
robust|adj.|对变化不敏感的|robust to noise|The estimator is robust to moderate measurement noise.|该估计器对适度测量噪声具有鲁棒性。|robust to；说明针对什么扰动和范围。
reliable|adj.|可靠的|reliable measurements|We need reliable measurements for this comparison.|我们需要可靠的测量来进行这次比较。|reliable 不等于精度一定高。
scalable|adj.|可扩展的|a scalable approach|We need a scalable approach for larger datasets.|我们需要适合更大数据集的可扩展方法。|可讨论数据量、并行规模或系统规模。
efficient|adj.|高效的|computationally efficient|The approximation is computationally efficient.|这种近似的计算效率较高。|efficient 高效；effective 有效。`,
`dependency|n.|依赖项或依赖关系|a software dependency|A missing software dependency prevents startup.|缺少一项软件依赖导致程序无法启动。|depend on；名词 dependency。
compatibility|n.|兼容性|check compatibility|Check compatibility before updating the package.|更新软件包之前先检查兼容性。|compatibility with。
overhead|n.|额外开销|communication overhead|Frequent messages increase communication overhead.|频繁的消息会增加通信开销。|开销可以是时间、内存或通信成本。
bottleneck|n.|性能瓶颈|identify the bottleneck|Profiling helps us identify the bottleneck.|性能分析帮助我们确定瓶颈。|避免只凭猜测宣布瓶颈。
workaround|n.|临时替代办法|a temporary workaround|This workaround avoids the crash but does not fix the cause.|这个临时办法绕过了崩溃，但没有修复原因。|在报告中交代局限和后续修复。`,
`feedback|n.|反馈|feedback control|The controller uses position feedback.|该控制器使用位置反馈。|此处 feedback 通常不可数。
setpoint|n.|设定值|track the setpoint|The output should track the setpoint.|输出应跟踪设定值。|也写 set point；此教程统一用 setpoint。
disturbance|n.|扰动|reject a disturbance|The controller is designed to reject a disturbance.|该控制器的设计目标是抑制扰动。|disturbance rejection；测量噪声不总与输入扰动同义。
transient|adj.|瞬态的|transient response|We compare the transient response of the two controllers.|我们比较两个控制器的瞬态响应。|transient 也可作名词表示瞬变过程。
steady-state|adj.|稳态的|steady-state error|We measure the steady-state error after the response settles.|我们在响应稳定后测量稳态误差。|steady state 作名词；steady-state 作定语。`,
`overshoot|n.|超调|reduce overshoot|We adjusted the gains to reduce overshoot.|我们调整了增益以减少超调。|超调定义和百分比的基准需要说明。
oscillation|n.|振荡|sustained oscillation|The plot shows sustained oscillation.|图中显示了持续振荡。|oscillate 是动词。
damping|n.|阻尼|increase damping|We investigate the effect of increasing damping.|我们研究增大阻尼的影响。|damping 阻尼；不要与 dumping 混淆。
saturation|n.|饱和|actuator saturation|Actuator saturation limits the available torque.|执行器饱和限制了可用转矩。|饱和是限制机制，后果依系统而定。
convergence|n.|收敛|check convergence|We check convergence before interpreting the solution.|我们在解读解之前检查收敛情况。|收敛不自动说明解最优或模型正确。`,
`pose|n.|位姿|estimate the pose|We estimate the pose of the object.|我们估计物体的位姿。|位姿包含位置与姿态，表达依具体约定。
reference frame|n.|参考坐标系|express in a reference frame|Express the position in the specified reference frame.|请用指定参考坐标系表达位置。|位置、速度等量要说明坐标系。
trajectory|n.|轨迹|track a trajectory|The finger tracks a smooth trajectory.|该手指跟踪一条平滑轨迹。|path 常偏几何路径；trajectory 通常带时间信息。
joint limit|n.|关节限制|respect a joint limit|The planner must respect each joint limit.|规划器必须遵守每个关节限制。|可能涉及位置、速度或力矩；明确具体类型。
workspace|n.|工作空间|the reachable workspace|The target lies inside the reachable workspace.|目标位于可达工作空间内。|workspace 在软件中也可指工作区。`,
`compliance|n.|柔顺性|mechanical compliance|Mechanical compliance affects the contact response.|机械柔顺性影响接触响应。|在简单线性同方向模型中可与刚度取倒数；一般需说明模型。
stiffness|n.|刚度|adjust the stiffness|We adjust the stiffness in the simulation.|我们在仿真中调整刚度。|平移刚度常用 N/m；转动刚度常用 N·m/rad。
impedance|n.|阻抗|impedance control|Impedance control specifies a desired motion-force relationship.|阻抗控制规定期望的运动与力之间的关系。|控制中的阻抗不能只等同于刚度。
contact|n.|接触|maintain contact|The fingertip should maintain contact with the object.|指尖应保持与物体接触。|contact force 接触力；contact-rich 接触丰富的。
slip|n.|滑移|detect slip|The sensor helps detect slip during the grasp.|该传感器帮助检测抓持过程中的滑移。|slip 也可作动词，slipping 表示正在滑动。`,
`grasp|n.|抓持|a stable grasp|The task requires a stable grasp.|该任务需要稳定的抓持。|grasp 可作动词：grasp the object。
manipulation|n.|操作|in-hand manipulation|In-hand manipulation changes the object pose within the hand.|手内操作改变物体在手中的位姿。|操控任务通常比单纯抓住物体更广。
coordination|n.|协调|multi-finger coordination|The task requires multi-finger coordination.|该任务需要多指协调。|coordinate 是动词。
dexterity|n.|灵巧性|improve dexterity|We evaluate dexterity across several manipulation tasks.|我们在多个操作任务上评估灵巧性。|不要直接把自由度数量当作灵巧性的全部。
actuator|n.|执行器|an actuator model|The actuator model includes torque limits.|该执行器模型包含转矩限制。|actuation 驱动；actuated 被驱动的。`,
`baseline|n.|基线方法|a simple baseline|We compare the policy with a simple baseline.|我们将该策略与一个简单基线进行比较。|baseline 是比较参照，未必是公认最强方法。
benchmark|n.|评测任务或基准|a common benchmark|We evaluate both methods on a common benchmark.|我们在同一评测基准上评估两种方法。|也可作动词 benchmark a system。
metric|n.|评价指标|an evaluation metric|Success rate is one evaluation metric.|成功率是一项评价指标。|metric 也有度量、米制等其他义项。
ablation|n.|消融实验|an ablation study|An ablation study examines the contribution of one component.|消融实验考察某一组件的贡献。|比较时仍需控制实验条件。
generalization|n.|泛化|generalization to new objects|We test generalization to new objects.|我们测试对新物体的泛化能力。|说明分布、物体或任务有哪些变化。`,
`formulation|n.|数学表述或问题形式化|a problem formulation|The problem formulation includes joint constraints.|该问题的数学表述包含关节约束。|formulate 是动词。
approximation|n.|近似|a linear approximation|We use a linear approximation near the operating point.|我们在工作点附近使用线性近似。|说明近似在哪个范围适用。
uncertainty|n.|不确定性|model uncertainty|The analysis accounts for model uncertainty.|该分析考虑了模型不确定性。|与随机性、误差不是完全同义。
limitation|n.|局限|a limitation of the method|A limitation of the method is its sensitivity to delay.|该方法的一项局限是对延迟敏感。|limitation of；be limited by。
applicability|n.|适用性|assess applicability|We assess applicability under different contact conditions.|我们评估不同接触条件下的适用性。|applicable to；不等同于手机应用 application。`,
`outperform|v.|表现优于|outperform the baseline|The method may outperform the baseline under these conditions.|在这些条件下，该方法可能优于基线。|及物动词，后面直接接比较对象。
deteriorate|v.|恶化|performance deteriorates|Performance deteriorates as the delay increases.|随着延迟增加，性能恶化。|通常不说 deteriorate the performance；可用 degrade performance。
converge|v.|收敛|converge to a solution|The solver converges to a feasible solution in this example.|在这个例子中，求解器收敛到一个可行解。|converge to；不保证全局最优。
diverge|v.|发散或偏离|diverge from the reference|The predicted trajectory begins to diverge from the reference.|预测轨迹开始偏离参考轨迹。|数学发散和路径逐渐偏离要看语境。
compensate|v.|补偿|compensate for delay|The design attempts to compensate for delay.|该设计尝试补偿延迟。|常用 compensate for something。`,
`in terms of|phrase|就某方面而言|in terms of accuracy|The methods differ in terms of accuracy.|这些方法在准确性方面存在差异。|后接名词或名词短语。
with respect to|phrase|关于或相对于|with respect to time|We compute the derivative with respect to time.|我们计算对时间的导数。|技术文本常简写 w.r.t.；本教程练完整形式。
account for|phrase|考虑到或解释|account for friction|The model should account for friction.|该模型应考虑摩擦。|account for 还可表示解释原因、占某个比例。
result in|phrase|导致|result in failure|An invalid command may result in failure.|无效指令可能导致失败。|result in + 结果；result from + 原因。
be subject to|phrase|受到限制或受制于|be subject to constraints|The solution may be subject to additional constraints.|该解可能受到额外约束。|主语变化时 be 需相应变化；此处练习原形短语。`,
`propose|v.|提出|propose a method|We propose a method for coordinating the fingers.|我们提出一种协调手指的方法。|propose doing；proposal 是名词。
investigate|v.|研究或调查|investigate the effect|We investigate the effect of contact uncertainty.|我们研究接触不确定性的影响。|investigate something，通常不加 on。
establish|v.|建立或确立|establish a baseline|We first establish a baseline for comparison.|我们首先建立用于比较的基线。|establish evidence 不如 establish a fact / provide evidence 自然。
quantify|v.|量化|quantify the improvement|We need a metric to quantify the improvement.|我们需要一个指标来量化改进。|说明如何测量和相对谁改进。
acknowledge|v.|承认并说明|acknowledge a limitation|We acknowledge a limitation of the current evaluation.|我们承认并说明当前评估的一项局限。|acknowledge that ...；也可表示致谢。`
  ];
  const themes = [
    ['把问题说清楚','用 identify、clarify、distinguish 各写一句，说明一个你正在学习的问题。'],
    ['读懂明确与隐含的信息','写出一项明确需求和一项隐含假设，再说明两者是否一致。'],
    ['掌握证据的语气','用 suggest、imply 和 demonstrate 写三句，区分观察、推断和有条件的结论。'],
    ['描述目标和约束','描述一个规划或日常安排问题，说明目标、约束和一项权衡。'],
    ['说明实现与评估','用 implement、compare 和 validate 描述一项小实验的计划。'],
    ['用英语描述调试过程','描述一次调试：如何复现、检查、缩小范围，再解决问题。没有真实经历时可写假想例子。'],
    ['准确命名异常','写一个排查计划，使用 discrepancy、mismatch 或 deviation，避免把所有情况都叫 bug。'],
    ['讨论软件工程流程','描述如何配置、初始化、集成和部署一个小组件。'],
    ['比较方案的质量','选择两个熟悉的方案，使用 feasible、robust 和 efficient 解释取舍。'],
    ['报告瓶颈与临时方案','写一段问题报告：依赖、瓶颈、临时办法及其局限。'],
    ['说明闭环响应','描述一个假想的设定值变化实验，包含反馈、扰动和稳态误差。'],
    ['描述响应曲线','描述一张想象中的响应曲线，使用 overshoot、oscillation 和 damping，保留条件。'],
    ['讲清轨迹和坐标系','用 pose、reference frame 和 trajectory 写一个机器人任务说明。'],
    ['描述接触行为','用 stiffness、impedance 和 slip 写一段接触仿真计划，不把仿真结果当作真机结论。'],
    ['介绍灵巧手任务','描述一个多指操作任务，包含 grasp、coordination 和 actuator。'],
    ['设计公平比较','说明一个实验的 baseline、metric 和 ablation，并交代测试条件。'],
    ['表达模型的局限','用 approximation、uncertainty 和 applicability 说明模型适用范围。'],
    ['讨论方法何时有效','写出某方法何时可能优于基线、何时性能恶化，以及一种可能的补偿办法。'],
    ['使用技术英语连接短语','用 account for、result in 和 in terms of 描述一项设计选择。'],
    ['完成一段研究摘要','写 50 至 80 词的小摘要：提出什么、研究什么、如何量化、有什么局限。']
  ];
  const weeks = [
    {title:'读懂文档，表达问题', subtitle:'技术阅读与高频表达', color:'#1c62d6'},
    {title:'描述调试与工程取舍', subtitle:'日志、集成与方案比较', color:'#087e80'},
    {title:'进入控制与灵巧操作', subtitle:'闭环、轨迹与接触', color:'#8653b5'},
    {title:'阅读论文，讨论实验', subtitle:'评估、论证与研究表达', color:'#b15a23'}
  ];
  const items = [], days = [];
  for (let week = 0; week < 4; week++) {
    for (let weekday = 0; weekday < 5; weekday++) {
      const index = week * 5 + weekday;
      const dayItems = raw[index].split('\n').map((row, j) => {
        const [word, pos, meaning, phrase, sentence, translation, note] = row.split('|');
        const item = {id:`w${index * 5 + j + 1}`, word, pos, meaning, phrase, sentence, translation, note, week:week + 1, day:week * 7 + weekday + 1};
        items.push(item); return item;
      });
      days.push({number:week * 7 + weekday + 1, week:week + 1, title:themes[index][0], prompt:themes[index][1], items:dayItems, review:false});
    }
    const weekItems = items.filter(i => i.week === week + 1);
    days.push({number:week * 7 + 6, week:week + 1, title:'复习与迁移', prompt:`从本周词汇中选 5 个，写 50 至 80 词，描述一个真实或假想的工程问题。至少改写一个例句，不要只照抄。`, items:[], pool:weekItems.map(i=>i.id), review:true});
    days.push({number:week * 7 + 7, week:week + 1, title:week === 3 ? '结课自测与下一步' : '每周自测与复述', prompt:week === 3 ? '不看例句，用 60 至 90 词说明：我的研究方向、一个问题、评估方法及局限。尽量用到不同周的 8 个词，再朗读 60 秒。' : '不看例句，用 50 至 80 词复述本周学到的一项方法。至少用到 5 个目标词，最后朗读 60 秒。', items:[], pool:weekItems.map(i=>i.id), review:true});
  }
  const data = {weeks, days, items};
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else root.CourseData = data;
})(typeof globalThis !== 'undefined' ? globalThis : this);
