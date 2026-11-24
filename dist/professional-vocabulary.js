(function(root){
  'use strict';
  // Each row: target | part of speech | Chinese meaning | collocation | original example | translation | usage note.
  const weeks = [
    {title:'Python 与程序表达',subtitle:'变量、函数、容器与测试',color:'#1c62d6',lessons:[
      ['变量与表达式',`variable|n.|变量|a local variable|Store the measured angle in a local variable.|把测得的角度存入一个局部变量。|变量名应反映量的含义，单位可另行说明。
constant|n.|常量|a physical constant|Keep this physical constant separate from tunable gains.|将这个物理常量与可调增益分开。|constant 也可作形容词，表示恒定的。
assignment|n.|赋值|an assignment statement|This assignment updates the target position.|这条赋值语句更新目标位置。|赋值和数学中的等式判断需要区分。
expression|n.|表达式|evaluate an expression|Evaluate the expression before updating the command.|更新指令前先计算表达式的值。|expression 的结果可以是数值、布尔值或其他对象。
statement|n.|语句|a conditional statement|A conditional statement handles the empty input.|一条条件语句处理空输入。|statement 和 expression 不是所有语言中都可互换。`],
      ['函数接口',`function|n.|函数|call a function|Call the function with the current joint positions.|用当前关节位置调用该函数。|call a function；函数参数的维度应明确。
argument|n.|实参|pass an argument|Pass the sampling period as an argument.|将采样周期作为实参传入。|argument 指调用时实际传入的值。
parameter|n.|形参或参数|a function parameter|This function parameter sets the number of samples.|这个函数参数设置采样点数。|形参是接口中的名字；工程中也指模型参数。
return value|n.|返回值|check the return value|Check the return value before using the solution.|使用解之前先检查返回值。|不要默认求解函数返回的结果一定有效。
scope|n.|作用域|variable scope|Variable scope determines where the name is visible.|变量作用域决定这个名称在哪里可见。|local scope 局部作用域；global scope 全局作用域。`],
      ['类型与对象',`data type|n.|数据类型|choose a data type|Choose a data type that preserves the required precision.|选择能保留所需精度的数据类型。|data type 与数据的物理单位是两件事。
type conversion|n.|类型转换|explicit type conversion|Use explicit type conversion when the interface requires it.|接口有要求时使用显式类型转换。|转换可能丢失精度，需要检查范围。
mutable|adj.|可变的|a mutable object|A mutable object can change after it is created.|可变对象在创建后可以发生变化。|注意共享可变对象引起的意外修改。
immutable|adj.|不可变的|an immutable object|An immutable object cannot be changed in place.|不可变对象不能被原地修改。|不可变对象与变量是否重新绑定要区分。
iterable|n.|可迭代对象|consume an iterable|The function accepts any iterable of joint names.|该函数接受包含关节名称的可迭代对象。|iterable 与 iterator 迭代器有关，但不完全相同。`],
      ['容器与数值数据',`list|n.|列表|a list of samples|Append the new measurement to the list of samples.|把新测量追加到样本列表中。|Python list 是容器，不等同于数值数组。
dictionary|n.|字典|a dictionary of settings|Store the experiment settings in a dictionary.|把实验设置存入一个字典。|通过 key 查找对应的 value。
tuple|n.|元组|a tuple of dimensions|Represent the image shape as a tuple of dimensions.|用一个维度元组表示图像形状。|Python tuple 本身不可变，内部元素仍可能可变。
set|n.|集合|a set of identifiers|Use a set of identifiers to remove duplicates.|用标识符集合去除重复项。|数学集合与控制中的 set 集合都很常见。
array|n.|数组|a multidimensional array|The observations are stored in a multidimensional array.|观测数据存放在一个多维数组中。|描述数组时同时说明 shape 和元素含义。`],
      ['异常与测试',`exception|n.|异常|raise an exception|Raise an exception when the dimensions are invalid.|维度无效时抛出异常。|raise an exception；捕获异常应有明确处理策略。
traceback|n.|异常调用回溯|read the traceback|Read the traceback to locate the failing operation.|阅读异常回溯以定位失败操作。|Python traceback 有助于追踪调用链。
assertion|n.|断言|a failed assertion|A failed assertion reveals an invalid assumption.|失败的断言揭示了一项无效假设。|assertion 用于检查预期条件，不替代所有输入校验。
unit test|n.|单元测试|write a unit test|Write a unit test for the coordinate conversion.|为坐标转换编写单元测试。|重点检查可观察行为和有意义的边界条件。
edge case|n.|边界或特殊情况|handle an edge case|An empty trajectory is an edge case worth testing.|空轨迹是值得测试的一种特殊情况。|edge case 不一定只指最大值或最小值。`]
    ]},
    {title:'C++ 与内存管理',subtitle:'编译单元、生命周期与接口',color:'#087e80',lessons:[
      ['代码声明与组织',`declaration|n.|声明|a function declaration|Put the function declaration in the header.|把函数声明放在头文件中。|声明介绍名称与类型，不一定提供完整实现。
definition|n.|定义|a function definition|The function definition belongs in this source file.|该函数定义放在这个源文件中。|区分声明与定义有助于排查链接错误。
header|n.|头文件|include a header|Include the header that declares this interface.|包含声明此接口的头文件。|header 常指 C 或 C++ 头文件。
source file|n.|源文件|compile a source file|Compile each source file with the same language standard.|使用同一语言标准编译每个源文件。|source file 与运行生成的数据文件不同。
translation unit|n.|翻译单元|a C++ translation unit|A translation unit includes the expanded headers.|一个翻译单元包含展开后的头文件内容。|这是编译过程中的概念，不是语言翻译。`],
      ['指针与生命周期',`pointer|n.|指针|a pointer to data|This pointer refers to the sensor buffer.|这个指针指向传感器缓冲区。|说明指针是否拥有对象，以及何时有效。
reference|n.|引用|pass by reference|Pass the matrix by reference to avoid an unnecessary copy.|按引用传递矩阵以避免不必要的复制。|C++ reference 与文献 reference 不是同一义项。
null pointer|n.|空指针|check for a null pointer|Check for a null pointer before accessing the optional device.|访问可选设备前先检查空指针。|空指针不指向有效对象。
dereference|v.|解引用|dereference a pointer|Do not dereference a pointer after its object is destroyed.|对象销毁后不要再解引用指向它的指针。|dereference 操作访问指针指向的对象。
lifetime|n.|生命周期|object lifetime|The buffer must remain valid throughout the object lifetime.|在该对象的整个生命周期内缓冲区必须有效。|lifetime 与变量名称的 scope 需要区分。`],
      ['内存与所有权',`allocation|n.|内存分配|dynamic allocation|Avoid unnecessary dynamic allocation in the update loop.|避免在更新循环中进行不必要的动态分配。|allocation 的成本与分配器和场景有关。
deallocation|n.|内存释放|memory deallocation|Memory deallocation must follow the ownership rules.|内存释放必须遵循所有权规则。|和 allocation 配对理解，防止重复释放。
stack|n.|调用栈或栈内存|stack storage|This small temporary object uses stack storage.|这个小型临时对象使用栈存储。|也可表示栈数据结构，需要看语境。
heap|n.|堆内存|heap memory|The container may allocate its elements in heap memory.|该容器可能在堆内存中分配元素。|heap 也可以指堆这种数据结构。
ownership|n.|所有权|transfer ownership|The factory transfers ownership of the new object.|工厂函数转移新对象的所有权。|所有权约定决定谁负责释放资源。`],
      ['资源安全',`constructor|n.|构造函数|a class constructor|The constructor establishes a valid initial state.|构造函数建立有效的初始状态。|不把可能阻塞的复杂操作随意塞进构造过程。
destructor|n.|析构函数|a class destructor|The destructor releases the owned resources.|析构函数释放所拥有的资源。|和 RAII 资源管理习惯一起理解。
smart pointer|n.|智能指针|use a smart pointer|Use a smart pointer to express the ownership policy.|用智能指针表达所有权策略。|unique_ptr 与 shared_ptr 的所有权语义不同。
resource leak|n.|资源泄漏|detect a resource leak|Repeated initialization exposed a resource leak.|反复初始化暴露了一处资源泄漏。|resource 不只包含内存，也可包含句柄等。
dangling pointer|n.|悬空指针|a dangling pointer|The stale callback holds a dangling pointer.|过期的回调持有一个悬空指针。|指针值仍存在，但所指对象已不再有效。`],
      ['泛型与多态',`template|n.|模板|a function template|The function template supports several scalar types.|这个函数模板支持多种标量类型。|C++ template 用于泛型表达。
overload|v.|重载|overload a function|We overload the function for scalar and vector inputs.|我们为标量和向量输入重载该函数。|overload 重载；override 通常指重写虚函数。
inheritance|n.|继承|class inheritance|Class inheritance represents the shared interface here.|这里用类继承表达共用接口。|不是所有复用需求都需要继承。
polymorphism|n.|多态|runtime polymorphism|Runtime polymorphism lets several controllers share an interface.|运行时多态使多个控制器共用一个接口。|运行时多态与模板的静态多态有不同取舍。
virtual function|n.|虚函数|override a virtual function|The derived class overrides the virtual function.|派生类重写该虚函数。|通过基类接口调用时可实现动态分派。`]
    ]},
    {title:'Linux Git 与构建工具',subtitle:'并发、版本管理与编译链接',color:'#8653b5',lessons:[
      ['进程与并发',`process|n.|进程|a background process|Run the logger as a separate process.|把日志程序作为独立进程运行。|process 在此是操作系统进程。
thread|n.|线程|a worker thread|A worker thread processes incoming measurements.|工作线程处理传入的测量。|同一进程的线程通常共享地址空间。
scheduler|n.|调度器|the operating system scheduler|The scheduler affects when the thread can run.|调度器影响线程何时能够运行。|高更新频率并不自动提供实时调度保证。
concurrency|n.|并发|control concurrency|The design must control concurrency around shared state.|设计必须控制共享状态周围的并发访问。|concurrency 并发与 parallelism 并行要区分。
race condition|n.|竞态条件|avoid a race condition|Unsynchronized updates can cause a race condition.|未同步的更新可能造成竞态条件。|结果依赖执行时序，是调试中的常见风险。`],
      ['同步与临界区',`mutex|n.|互斥锁|lock a mutex|Lock the mutex before changing the shared buffer.|修改共享缓冲区前先加互斥锁。|需要考虑持锁时长及线程阻塞。
deadlock|n.|死锁|prevent deadlock|A consistent lock order helps prevent deadlock.|一致的加锁顺序有助于避免死锁。|deadlock 不是单纯执行缓慢。
atomic operation|n.|原子操作|an atomic operation|This counter is updated with an atomic operation.|这个计数器通过原子操作更新。|单个操作原子化不代表整个算法没有竞态。
critical section|n.|临界区|a short critical section|Keep the critical section short and predictable.|保持临界区简短且可预测。|临界区保护对共享资源的访问。
synchronization|n.|同步|thread synchronization|Thread synchronization protects the shared state.|线程同步保护共享状态。|还常用于描述传感器或时钟同步。`],
      ['Git 中的版本变化',`repository|n.|代码仓库|a Git repository|Keep the experiment scripts in the same repository.|把实验脚本保存在同一个仓库中。|repository 通常缩写为 repo。
commit|n.|提交|a reproducible commit|Record the commit used for each experiment.|记录每次实验使用的提交。|commit 也可作动词，表示提交版本。
branch|n.|分支|a feature branch|Create a feature branch for the controller change.|为控制器修改创建功能分支。|分支名不等于实验配置。
merge|v.|合并|merge a branch|Merge the branch after the relevant checks pass.|相关检查通过后合并分支。|合并后仍需关注组合后的实际行为。
rebase|v.|变基|rebase a branch|Rebase the local branch onto the updated main branch.|把本地分支变基到更新后的主分支上。|变基改写提交关系，已共享分支需谨慎处理。`],
      ['工作区与远端',`working tree|n.|工作树|a clean working tree|Start the experiment from a clean working tree.|从干净工作树启动实验。|工作树是检出的文件，不等于 Git 全部历史。
staging area|n.|暂存区|review the staging area|Review the staging area before creating the commit.|创建提交前检查暂存区。|staged changes 是已准备纳入下一提交的修改。
diff|n.|差异对比|inspect the diff|Inspect the diff to understand the parameter changes.|检查差异以理解参数修改。|diff 也常指比较工具的输出。
conflict|n.|冲突|a merge conflict|Resolve the merge conflict using the intended behavior.|根据预期行为解决合并冲突。|解决冲突不只是删除标记。
remote|n.|远程仓库引用|a Git remote|The remote points to the shared project repository.|这个远程引用指向共享项目仓库。|origin 是常见名称，不是固定必须的名称。`],
      ['构建与链接',`compiler|n.|编译器|a C++ compiler|Use a compiler that supports the required standard.|使用支持所需语言标准的编译器。|编译通过和运行正确是两个验证层次。
linker|n.|链接器|a linker error|The linker error reports a missing function definition.|链接器错误报告缺少函数定义。|undefined reference 常在链接阶段出现。
build target|n.|构建目标|a CMake build target|The build target declares its required libraries.|构建目标声明所需的库。|优先围绕 target 管理依赖和编译选项。
shared library|n.|共享库|load a shared library|The plugin loads a shared library at runtime.|该插件在运行时加载共享库。|Windows 与 Linux 的文件格式和搜索路径不同。
toolchain|n.|工具链|a cross-compilation toolchain|The toolchain determines the compiler and target platform.|工具链决定编译器和目标平台。|交叉编译时尤其需要区分宿主与目标平台。`]
    ]},
    {title:'ROS 2 系统结构',subtitle:'节点、通信接口与运行组织',color:'#b15a23',lessons:[
      ['节点与话题',`node|n.|节点|a ROS 2 node|This node publishes the estimated joint state.|这个节点发布估计的关节状态。|节点是 ROS 2 图中的计算参与者。
topic|n.|话题|publish on a topic|The sensor publishes measurements on this topic.|传感器在这个话题上发布测量数据。|话题常用于持续的数据流。
publisher|n.|发布者|create a publisher|Create a publisher for the command messages.|为指令消息创建发布者。|发布者与订阅者需要兼容的接口和通信配置。
subscriber|n.|订阅者|a topic subscriber|The subscriber receives the latest observation.|订阅者接收最新观测。|常见搭配 subscribe to a topic。
message|n.|消息|a typed message|The message contains positions and a timestamp.|这条消息包含位置与时间戳。|消息字段的单位和坐标系仍需明确。`],
      ['服务请求与响应',`service|n.|服务|call a service|The tool calls a service to request calibration.|该工具调用一个服务来请求标定。|服务通常采用请求与响应交互。
client|n.|客户端|a service client|The client sends a request to the calibration service.|客户端向标定服务发送请求。|客户端与服务器是交互角色，不一定是不同机器。
server|n.|服务器端|a service server|The server returns the calibration status.|服务器端返回标定状态。|长耗时且需要反馈的任务可考虑 action。
request|n.|请求|send a request|The request includes the desired operating mode.|请求中包含期望运行模式。|服务接口中 request 与 response 配对。
response|n.|响应|receive a response|Check the response before changing the operating mode.|改变运行模式前检查响应。|收到响应不自动等于请求成功，需看返回字段。`],
      ['动作与回调',`action|n.|动作接口|a ROS 2 action|Use an action for a task that needs progress feedback.|对需要进度反馈的任务使用动作接口。|action 在强化学习中也指智能体动作。
goal|n.|目标请求|send a goal|The client sends a goal to the trajectory action.|客户端向轨迹动作接口发送目标请求。|goal 可以描述任务目标，而非单个控制量。
result|n.|最终结果|an action result|The result reports whether the task succeeded.|最终结果报告任务是否成功。|区分执行过程中的 feedback 与最终 result。
cancellation|n.|取消请求或取消过程|request cancellation|The operator requests cancellation of the active goal.|操作者请求取消正在执行的目标。|发出取消请求后，还需确认实际执行状态。
callback|n.|回调|a subscription callback|Keep the subscription callback short.|保持订阅回调简短。|耗时回调可能影响其他任务的响应。`],
      ['执行与节点组织',`executor|n.|执行器调度组件|a ROS 2 executor|The executor schedules available callbacks.|ROS 2 executor 调度可执行的回调。|此处 executor 不是机械执行器 actuator。
callback group|n.|回调组|a mutually exclusive callback group|The callback group restricts concurrent execution.|这个回调组限制并发执行。|回调组行为还与 executor 配置有关。
lifecycle node|n.|生命周期节点|a managed lifecycle node|The lifecycle node separates configuration from activation.|生命周期节点将配置与激活分开。|用于显式组织节点的状态转换。
namespace|n.|命名空间|a node namespace|Use a namespace to separate the two robot instances.|用命名空间区分两个机器人实例。|namespace 也有 C++ 名称组织的义项。
remapping|n.|名称重映射|topic remapping|Remapping connects the component to a different topic name.|名称重映射把组件连接到不同的话题名。|重映射名称不负责转换消息的数据含义。`],
      ['参数与包管理',`node parameter|n.|节点参数|set a node parameter|Set the node parameter before starting the experiment.|在启动实验前设置节点参数。|ROS 2 参数与节点关联，不假设集中式参数服务器。
launch file|n.|启动文件|a launch file|The launch file starts the required nodes together.|启动文件一起启动所需节点。|可组织节点、参数与重映射。
package|n.|软件包|a ROS 2 package|This package contains the controller interface.|这个软件包包含控制器接口。|package 在 Python、ROS 2 等工具中有具体约定。
colcon|n.|构建工具 colcon|build with colcon|Build the selected packages with colcon.|用 colcon 构建选定的软件包。|colcon 是构建编排工具，不是编译器本身。
ament|n.|ROS 2 构建基础设施|an ament package|The package uses ament to integrate its build metadata.|该软件包用 ament 集成构建元数据。|ament 与 colcon 处在不同工具层次。`]
    ]}
  ];
  weeks.push(
    {title:'ROS 2 通信与时序',subtitle:'服务质量、数据流与坐标树',color:'#1c62d6',lessons:[
      ['服务质量策略',`quality of service|n.|服务质量|a quality of service profile|The quality of service profile must match the data needs.|服务质量配置必须符合数据需求。|通常缩写为 QoS，策略之间可能存在兼容性要求。
reliability|n.|可靠性策略|a reliability policy|The reliability policy controls delivery guarantees.|可靠性策略控制传输保证。|ROS 2 中常见 reliable 与 best effort 两类选项。
durability|n.|持久性策略|a durability policy|The durability policy affects late subscribers.|持久性策略影响晚加入的订阅者。|不要直接理解成消息必然写入磁盘。
history|n.|历史保留策略|a history policy|The history policy limits which samples are retained.|历史保留策略限制保留哪些样本。|在 QoS 中讨论的是样本保留行为。
depth|n.|队列深度|queue depth|Choose the queue depth for the expected message rate.|根据预期消息速率选择队列深度。|保留最后若干样本时，深度与历史策略共同起作用。`],
      ['发现与数据编码',`deadline|n.|截止期限或期望间隔|a missed deadline|The monitor reports a missed deadline.|监测程序报告一次截止期限未满足。|QoS 中的 deadline 关注预期更新间隔。
liveliness|n.|活跃性|a liveliness policy|The liveliness policy helps detect inactive publishers.|活跃性策略帮助发现不再活跃的发布者。|与普通英文 lively 的含义不同。
discovery|n.|发现机制|automatic discovery|Automatic discovery lets compatible participants find each other.|自动发现使兼容的参与者能够相互发现。|发现成功还不代表数据交互配置全部正确。
serialization|n.|序列化|message serialization|Message serialization converts data into a transportable representation.|消息序列化把数据转换为便于传输的表示。|常与通信成本、内存复制和格式兼容相关。
deserialization|n.|反序列化|message deserialization|Deserialization reconstructs the message fields.|反序列化重建消息字段。|输入数据的版本与接口定义应匹配。`],
      ['测量通信性能',`timestamp|n.|时间戳|a sensor timestamp|Use the sensor timestamp when aligning observations.|对齐观测时使用传感器时间戳。|说明时间基准以及时间戳对应的事件。
latency|n.|延迟|end-to-end latency|Measure the end-to-end latency of the command path.|测量指令链路的端到端延迟。|延迟与数据吞吐量不是同一个指标。
throughput|n.|吞吐量|message throughput|The logger measures message throughput under load.|日志程序测量负载下的消息吞吐量。|说明单位，例如 messages/s 或 bytes/s。
bandwidth|n.|带宽|network bandwidth|Image streaming consumes network bandwidth.|图像流传输消耗网络带宽。|控制带宽中的 bandwidth 是另一个相关领域义项。
jitter|n.|时序抖动|timing jitter|Timing jitter makes the update interval less predictable.|时序抖动使更新间隔更难预测。|需要说明测量窗口和抖动的计算方式。`],
      ['坐标树与同步',`transform tree|n.|变换树|a connected transform tree|The transform tree connects the sensor frame to the base frame.|变换树把传感器坐标系连接到基座坐标系。|关注父子关系、方向约定和时间。
coordinate transform|n.|坐标变换|apply a coordinate transform|Apply the coordinate transform before comparing the positions.|比较位置之前先进行坐标变换。|变换的源坐标系和目标坐标系要明确。
static transform|n.|静态变换|publish a static transform|Publish a static transform for the fixed sensor mount.|为固定传感器安装位发布静态变换。|静态表示相对变换不随时间变化。
frame identifier|n.|坐标系标识符|a frame identifier|The frame identifier tells us where the vector is expressed.|坐标系标识符说明向量在哪个坐标系表达。|名称一致仍不代表物理标定正确。
time synchronization|n.|时间同步|sensor time synchronization|Time synchronization is important when combining measurements.|融合测量时，时间同步很重要。|同步时钟与对齐数据时间戳是相关但不同的操作。`],
      ['记录与接口',`bag file|n.|消息记录文件|a recorded bag file|The bag file contains the observations used in the test.|消息记录文件包含测试中使用的观测。|常用于离线分析与回放，仍需记录录制条件。
playback|n.|回放|controlled playback|Controlled playback helps reproduce the message sequence.|受控回放有助于复现消息序列。|回放的时间配置可能影响节点行为。
recording|n.|录制|a sensor recording|The recording includes the relevant sensor topics.|这份录制包含相关传感器话题。|记录数据时还要保留配置和版本信息。
message filter|n.|消息过滤器|a message filter|The message filter waits for compatible timestamps.|消息过滤器等待兼容的时间戳。|具体同步或过滤行为依所选策略而定。
interface definition|n.|接口定义|a shared interface definition|Both components use the same interface definition.|两个组件使用同一接口定义。|字段名称、类型、单位和语义都属于接口约定。`]
    ]},
    {title:'机器人几何与空间表示',subtitle:'位姿、向量运算与运动表示',color:'#087e80',lessons:[
      ['刚体运动的组成',`position|n.|位置|the fingertip position|Express the fingertip position in the base frame.|在基座坐标系下表达指尖位置。|位置的数值必须结合坐标系和单位理解。
orientation|n.|姿态|object orientation|Estimate the object orientation from the observation.|根据观测估计物体姿态。|orientation 表示朝向，与位置 position 区分。
translation|n.|平移|a translation vector|The translation vector locates the sensor origin.|平移向量描述传感器原点的位置。|在几何中不是语言翻译的含义。
rotation|n.|旋转|a rotation about an axis|Specify the rotation about the selected axis.|指定绕所选轴的旋转。|说明旋转的轴、角度及约定。
rigid body|n.|刚体|a rigid body model|The simulation treats the link as a rigid body.|仿真把连杆视为刚体。|刚体模型忽略所建模物体内部的形变。`],
      ['姿态的常用表示',`rotation matrix|n.|旋转矩阵|a valid rotation matrix|Check that the estimated rotation matrix is valid.|检查估计的旋转矩阵是否有效。|三维旋转矩阵应满足正交性及行列式为正一。
quaternion|n.|四元数|a unit quaternion|Normalize the quaternion before using it as an orientation.|将四元数用于姿态表示前先归一化。|关注分量顺序，以及 q 与负 q 表示同一旋转。
Euler angle|n.|欧拉角|an Euler angle convention|State the Euler angle convention in the interface.|在接口中说明欧拉角约定。|旋转顺序不同会改变数值的含义。
axis-angle|n.|轴角表示|an axis-angle representation|The axis-angle representation describes a rotation.|轴角表示描述一次旋转。|通常需要单位轴向量和旋转角。
homogeneous transformation|n.|齐次变换|a homogeneous transformation matrix|Use a homogeneous transformation to combine rotation and translation.|用齐次变换组合旋转与平移。|矩阵乘法顺序取决于变换方向和向量约定。`],
      ['向量运算',`vector norm|n.|向量范数|compute the vector norm|Compute the vector norm to measure the error magnitude.|计算向量范数以度量误差大小。|必须说明使用哪一种范数。
dot product|n.|点积|take the dot product|The dot product measures the directional alignment.|点积反映方向上的对齐关系。|单位向量的点积与夹角余弦有关。
cross product|n.|叉积|compute a cross product|Compute the cross product to obtain the torque direction.|计算叉积以得到转矩方向。|方向遵循约定的右手规则。
projection|n.|投影|an orthogonal projection|Use an orthogonal projection onto the contact plane.|使用到接触平面上的正交投影。|说明投影的空间和使用的内积。
basis|n.|基|an orthonormal basis|Choose an orthonormal basis for the local frame.|为局部坐标系选择一组正交归一基。|basis 的复数是 bases。`],
      ['速度与力的空间表示',`angular velocity|n.|角速度|measure angular velocity|The sensor reports angular velocity in radians per second.|该传感器以弧度每秒报告角速度。|不要直接把欧拉角变化率等同于角速度向量。
linear velocity|n.|线速度|the fingertip linear velocity|Compute the fingertip linear velocity in the world frame.|在世界坐标系下计算指尖线速度。|说明所指点、坐标系和单位。
twist|n.|空间速度旋量|a spatial twist|The twist combines angular and linear velocity components.|速度旋量组合角速度与线速度分量。|六维分量的排列和参考点约定需要明确。
wrench|n.|空间力旋量|a contact wrench|Express the contact wrench about the specified point.|相对指定点表达接触力旋量。|通常包含力和力矩，排列约定可能不同。
skew-symmetric|adj.|反对称的|a skew-symmetric matrix|A skew-symmetric matrix can represent a cross product operation.|反对称矩阵可以表示叉积运算。|矩阵满足转置等于自身的负值。`],
      ['机器人空间',`configuration|n.|构型|a robot configuration|This configuration satisfies the position limits.|这个构型满足位置限制。|configuration 也可指软件配置，注意领域。
degree of freedom|n.|自由度|an independent degree of freedom|Count each independent degree of freedom in the model.|统计模型中的每个独立自由度。|自由度数量不总等于驱动器或关节的数量。
configuration space|n.|构型空间|search the configuration space|The planner searches the configuration space.|规划器搜索构型空间。|维数由独立构型变量决定。
task space|n.|任务空间|a task space objective|The task space objective describes the desired fingertip motion.|任务空间目标描述期望的指尖运动。|任务变量可以是位置、姿态或其他任务相关量。
end effector|n.|末端执行器|an end effector pose|The planner specifies the end effector pose.|规划器指定末端执行器位姿。|灵巧手可整体作为末端执行器，也可讨论指尖任务。`]
    ]},
    {title:'运动学与运动规划',subtitle:'映射、碰撞与轨迹生成',color:'#8653b5',lessons:[
      ['关节与末端的映射',`kinematics|n.|运动学|robot kinematics|Robot kinematics relates joint motion to task motion.|机器人运动学将关节运动与任务运动联系起来。|通常不直接研究产生运动所需的力。
forward kinematics|n.|正运动学|compute forward kinematics|Forward kinematics gives the fingertip pose for a joint configuration.|正运动学根据关节构型给出指尖位姿。|输入构型，输出约定坐标系下的位姿。
inverse kinematics|n.|逆运动学|solve inverse kinematics|Solve inverse kinematics for the desired fingertip pose.|为期望指尖位姿求解逆运动学。|可能无解、多解或需要数值迭代。
Jacobian|n.|雅可比矩阵|a geometric Jacobian|The Jacobian maps joint rates to the chosen task velocity.|雅可比矩阵把关节速度映射到所选任务速度。|矩阵维度和坐标系依任务变量定义而定。
singularity|n.|奇异位形或奇异性|near a singularity|The velocity mapping becomes ill-conditioned near a singularity.|接近奇异位形时速度映射会变得病态。|关注秩、条件数以及对应任务方向。`],
      ['可达性与冗余',`redundancy|n.|运动学冗余|kinematic redundancy|Kinematic redundancy allows additional posture objectives.|运动学冗余允许加入额外姿态目标。|冗余是相对于所定义的任务而言的。
null space|n.|零空间|a null space motion|A null space motion can change posture without changing the linearized task.|零空间运动可改变姿态而不改变线性化任务。|该说法依赖当前雅可比及局部近似。
manipulability|n.|可操作度|a manipulability measure|We compare manipulability near the target configuration.|我们比较目标构型附近的可操作度。|度量定义、尺度与任务单位会影响数值。
reachable set|n.|可达集|a reachable set estimate|The reachable set estimate helps reject impossible targets.|可达集估计有助于排除不可能的目标。|说明是否考虑碰撞、关节限制和动态约束。
self-collision|n.|自碰撞|check for self-collision|Check for self-collision before executing the motion.|执行运动前检查自碰撞。|连杆或手指之间也可能发生碰撞。`],
      ['碰撞检查',`collision detection|n.|碰撞检测|perform collision detection|Perform collision detection along the candidate path.|沿候选路径进行碰撞检测。|离散采样可能漏掉采样点之间的碰撞。
collision avoidance|n.|避碰|a collision avoidance constraint|Add a collision avoidance constraint to the planner.|为规划器添加避碰约束。|约束是否可靠取决于模型、算法及离散化。
obstacle|n.|障碍物|a moving obstacle|The planner updates its estimate of the moving obstacle.|规划器更新对运动障碍物的估计。|动态障碍还涉及时间预测。
clearance|n.|间隙或安全净距|minimum clearance|Measure the minimum clearance along the path.|测量路径上的最小净距。|说明距离计算对象和采用的几何模型。
bounding volume|n.|包围体|a bounding volume hierarchy|A bounding volume helps reject distant collision pairs.|包围体有助于排除相距较远的碰撞对。|包围体是碰撞计算的简化工具。`],
      ['规划算法的语言',`motion planning|n.|运动规划|a motion planning problem|The motion planning problem includes joint limits and obstacles.|该运动规划问题包含关节限制和障碍物。|不同文献对路径、时间和动力学的纳入范围不同。
path planning|n.|路径规划|a path planning algorithm|The path planning algorithm finds a geometric route.|路径规划算法寻找几何路线。|路径常需进一步进行时间参数化。
sampling-based planning|n.|基于采样的规划|a sampling-based planning method|We test a sampling-based planning method in this space.|我们在这个空间中测试一种基于采样的规划方法。|实际表现依采样策略、碰撞检测和问题结构而定。
roadmap|n.|路线图|a probabilistic roadmap|The roadmap connects sampled collision-free configurations.|路线图连接采样得到的无碰撞构型。|在规划语境中是图结构，不是项目进度安排。
search tree|n.|搜索树|expand a search tree|The planner expands a search tree toward new samples.|规划器向新样本扩展搜索树。|tree 中的节点与机器人实际构型相对应。`],
      ['路径到时间轨迹',`waypoint|n.|路径点|an intermediate waypoint|Add an intermediate waypoint to guide the motion.|添加一个中间路径点引导运动。|经过路径点不保证路径段满足全部约束。
interpolation|n.|插值|joint interpolation|Joint interpolation connects the specified configurations.|关节插值连接指定构型。|插值的空间和方法需要明确。
spline|n.|样条|a smooth spline|Fit a spline through the selected waypoints.|用样条拟合选定的路径点。|连续性阶数取决于样条类型与约束。
time parameterization|n.|时间参数化|trajectory time parameterization|Time parameterization assigns a schedule to the path.|时间参数化为路径分配时间规律。|需关注速度、加速度以及可能的力矩限制。
path length|n.|路径长度|minimize path length|The planner attempts to minimize path length.|规划器尝试最小化路径长度。|路径短不自动代表时间短或控制容易。`]
    ]},
    {title:'动力学与驱动系统',subtitle:'力、能量、传动与测量',color:'#b15a23',lessons:[
      ['质量与惯性',`dynamics|n.|动力学|robot dynamics|Robot dynamics relates motion to forces and torques.|机器人动力学将运动与力和转矩联系起来。|与主要研究几何运动关系的 kinematics 区分。
mass|n.|质量|the object mass|The object mass is one uncertain model parameter.|物体质量是一项不确定的模型参数。|质量常用 kg，不能和重量的力单位混用。
inertia|n.|惯性或惯量|rotational inertia|Rotational inertia depends on the chosen axis.|转动惯量取决于所选轴。|惯量矩阵还依赖参考点和坐标表达。
center of mass|n.|质心|estimate the center of mass|Estimate the center of mass of the grasped object.|估计被抓持物体的质心。|常缩写为 CoM，位置要说明坐标系。
mass matrix|n.|质量矩阵|a configuration-dependent mass matrix|The mass matrix changes with the robot configuration.|质量矩阵随机器人的构型变化。|浮动基座等模型中的维度与坐标约定相关。`],
      ['广义坐标与作用力',`Coriolis force|n.|科里奥利力|a Coriolis force term|The model includes Coriolis force terms.|该模型包含科里奥利力项。|多体动力学中通常与速度耦合项一起讨论。
centrifugal force|n.|离心力|a centrifugal force term|The rotating-frame model contains a centrifugal force term.|旋转坐标系模型包含离心力项。|需结合所使用的参考系理解。
gravitational torque|n.|重力矩|compensate for gravitational torque|The controller compensates for the predicted gravitational torque.|控制器补偿预测的重力矩。|补偿效果依赖质量参数和姿态估计。
generalized coordinate|n.|广义坐标|a generalized coordinate vector|Choose a generalized coordinate vector for the model.|为模型选择广义坐标向量。|某些姿态表示下，广义速度不直接等于坐标导数。
generalized force|n.|广义力|a generalized force vector|Map the contact forces into generalized forces.|将接触力映射为广义力。|与所选广义坐标及虚功关系对应。`],
      ['能量与运动方程',`kinetic energy|n.|动能|compute kinetic energy|Compute the kinetic energy from the current velocity.|根据当前速度计算动能。|常用单位 J；模型应包含相关转动与平动贡献。
potential energy|n.|势能|gravitational potential energy|The potential energy changes as the object rises.|物体升高时，势能发生变化。|势能零点可选，物理预测依赖一致约定。
Lagrangian|n.|拉格朗日函数|form the Lagrangian|Form the Lagrangian from kinetic and potential energy.|由动能和势能构造拉格朗日函数。|在常见机械系统中采用动能减势能。
equation of motion|n.|运动方程|derive the equation of motion|Derive the equation of motion before designing the controller.|设计控制器之前先推导运动方程。|推导后要检查符号、维度和物理单位。
inverse dynamics|n.|逆动力学|an inverse dynamics model|Inverse dynamics predicts the torque required for a specified motion.|逆动力学预测指定运动所需的转矩。|需要约定外力、接触和驱动约束。`],
      ['动力学预测与摩擦',`forward dynamics|n.|正动力学|compute forward dynamics|Forward dynamics predicts acceleration from the applied forces.|正动力学根据施加的力预测加速度。|接触和约束会影响求解过程。
friction|n.|摩擦|a friction model|Choose a friction model appropriate for the experiment.|选择适合该实验的摩擦模型。|摩擦参数通常需要识别或敏感性分析。
viscous friction|n.|黏性摩擦|a viscous friction coefficient|The model includes viscous friction proportional to velocity.|该模型包含与速度成比例的黏性摩擦。|线性比例关系是一种常用模型假设。
Coulomb friction|n.|库仑摩擦|a Coulomb friction model|A Coulomb friction model approximates dry sliding friction.|库仑摩擦模型近似描述干滑动摩擦。|零速度附近的静摩擦行为需另行考虑。
stiction|n.|静摩擦黏滞效应|overcome stiction|The actuator must overcome stiction before motion begins.|运动开始前，执行器必须克服静摩擦黏滞效应。|常用于描述静止时阻碍起动的摩擦行为。`],
      ['驱动与传动',`transmission|n.|传动装置或传动关系|a tendon transmission|The transmission maps motor motion to joint motion.|传动装置把电机运动映射为关节运动。|还需要考虑效率、柔性和间隙。
gear ratio|n.|齿轮传动比|specify the gear ratio|Specify the gear ratio and its direction convention.|说明传动比及其方向约定。|不同定义可能采用相反的分子和分母。
backlash|n.|传动间隙|mechanical backlash|Backlash creates lost motion when the direction reverses.|方向反转时，传动间隙会产生空行程。|不是所有误差都可用固定线性增益补偿。
tendon|n.|腱或传动绳索|a tendon-driven finger|The tendon transmits tension to the finger mechanism.|腱向手指机构传递拉力。|腱驱动通常要关注走线、摩擦和预紧。
torque sensor|n.|转矩传感器|a calibrated torque sensor|The torque sensor measures the load at the selected joint.|转矩传感器测量选定关节处的负载。|注意量程、偏置、标定和安装位置。`]
    ]}
  );
  weeks.push(
    {title:'经典控制与稳定性',subtitle:'PID、响应分析与频域表达',color:'#1c62d6',lessons:[
      ['闭环与增益',`closed loop|n.|闭环|a closed loop system|The closed loop uses measurements to update the command.|闭环利用测量数据更新指令。|反馈路径、采样和延迟都影响实际闭环行为。
open loop|n.|开环|an open loop command|The open loop command does not correct the measured tracking error.|开环指令不根据测得的跟踪误差进行修正。|预先计算的轨迹仍可以由下层闭环跟踪。
tracking error|n.|跟踪误差|reduce tracking error|Define the tracking error before tuning the gains.|调节增益之前先定义跟踪误差。|说明参考减实际，还是实际减参考。
proportional gain|n.|比例增益|tune the proportional gain|We tune the proportional gain in simulation first.|我们首先在仿真中调节比例增益。|增益的单位取决于输入、输出和控制结构。
integral gain|n.|积分增益|an integral gain setting|The integral gain setting affects the accumulated error term.|积分增益设置影响误差累积项。|离散实现中要检查积分是否乘以采样周期。`],
      ['微分与抗饱和',`derivative gain|n.|微分增益|adjust the derivative gain|Adjust the derivative gain while monitoring measurement noise.|监测测量噪声的同时调节微分增益。|微分项的噪声敏感性和滤波需要关注。
integral windup|n.|积分饱和累积|prevent integral windup|Actuator limits can lead to integral windup.|执行器限制可能导致积分饱和累积。|通常与输出受限时积分器继续累积有关。
anti-windup|n.|抗积分饱和|an anti-windup scheme|The anti-windup scheme limits excessive integral accumulation.|抗积分饱和方案限制过度的积分累积。|具体实现有条件积分、反算等不同方式。
feedforward|n.|前馈|a feedforward term|The feedforward term uses the reference acceleration.|前馈项使用参考加速度。|前馈依赖参考或模型，不等于误差反馈。
settling time|n.|调节时间|measure settling time|Measure the settling time using a specified tolerance band.|使用指定容差带测量调节时间。|报告结果时说明误差带，例如相对参考值的百分比。`],
      ['动态响应指标',`rise time|n.|上升时间|a rise time measurement|The rise time measurement uses fixed percentage thresholds.|上升时间测量使用固定的百分比阈值。|常见定义不止一种，比较时需要保持一致。
damping ratio|n.|阻尼比|the dominant damping ratio|We estimate the damping ratio from the oscillatory response.|我们根据振荡响应估计阻尼比。|二阶近似是否合适需要根据系统判断。
natural frequency|n.|固有频率|an undamped natural frequency|The model predicts an undamped natural frequency.|该模型预测一个无阻尼固有频率。|区分 rad/s 与 Hz，以及有阻尼和无阻尼频率。
time constant|n.|时间常数|a first-order time constant|The time constant describes the speed of this first-order response.|时间常数描述这个一阶响应的快慢。|不能把所有高阶系统概括为一个时间常数。
delay compensation|n.|延迟补偿|a delay compensation method|We assess the delay compensation method under timing uncertainty.|我们在时序不确定条件下评估延迟补偿方法。|延迟模型和补偿方法的假设需要验证。`],
      ['稳定性论证',`stability|n.|稳定性|closed-loop stability|Check closed-loop stability under the stated assumptions.|在所述假设下检查闭环稳定性。|稳定性不是单次仿真没有发散的同义词。
asymptotic stability|n.|渐近稳定性|local asymptotic stability|The proof establishes local asymptotic stability.|该证明建立了局部渐近稳定性。|需要交代平衡点和局部适用范围。
boundedness|n.|有界性|signal boundedness|The analysis considers the boundedness of the internal signals.|该分析考察内部信号的有界性。|有界不自动等于趋于目标值。
Lyapunov function|n.|李雅普诺夫函数|a candidate Lyapunov function|Choose a candidate Lyapunov function for the error dynamics.|为误差动力学选择候选李雅普诺夫函数。|候选函数需要满足对应论证所要求的条件。
region of attraction|n.|吸引域|estimate the region of attraction|We estimate the region of attraction around the equilibrium.|我们估计平衡点周围的吸引域。|局部稳定证明通常不意味着全局收敛。`],
      ['频域分析',`transfer function|n.|传递函数|a transfer function model|The transfer function describes this linear input-output relation.|传递函数描述这个线性输入输出关系。|使用前要说明线性模型及初始条件约定。
frequency response|n.|频率响应|measure frequency response|Measure the frequency response over the relevant range.|在相关范围内测量频率响应。|输入激励幅值及系统线性近似范围都重要。
Bode plot|n.|伯德图|inspect the Bode plot|Inspect the Bode plot before changing the filter.|修改滤波器前检查伯德图。|通常展示幅值和相位随频率变化。
phase margin|n.|相位裕度|check the phase margin|Check the phase margin for the selected loop model.|对所选回路模型检查相位裕度。|多回路、延迟及开环不稳定情况需结合适用条件。
gain margin|n.|增益裕度|a gain margin estimate|The gain margin estimate depends on the loop model.|增益裕度估计取决于回路模型。|裕度指标不能替代全部鲁棒性与非线性分析。`]
    ]},
    {title:'状态空间与最优控制',subtitle:'系统性质、估计与离散实现',color:'#087e80',lessons:[
      ['状态模型',`state|n.|状态|the system state|The state contains the variables needed by this model.|状态包含该模型所需的变量。|区分真实状态、估计状态和可获得的观测。
state vector|n.|状态向量|define the state vector|Define the state vector with a fixed component order.|用固定的分量顺序定义状态向量。|位置和速度的排列必须在接口之间一致。
state space|n.|状态空间|a state space model|The state space model describes the system evolution.|状态空间模型描述系统的演化。|state space 不等于任务空间 task space。
state transition|n.|状态转移|a state transition model|The state transition model predicts the next state.|状态转移模型预测下一时刻状态。|离散时间中的下一步取决于采样周期。
linearization|n.|线性化|local linearization|Local linearization approximates the dynamics near an operating point.|局部线性化近似工作点附近的动力学。|近似范围越大并不必然仍然准确。`],
      ['系统性质',`equilibrium|n.|平衡点或平衡状态|an equilibrium point|The equilibrium point satisfies the stationary dynamics.|平衡点满足静止的动力学关系。|常需同时说明平衡状态与平衡输入。
operating point|n.|工作点|choose an operating point|Choose the operating point for the local model.|为局部模型选择工作点。|沿轨迹线性化时，参考点可随时间变化。
controllability|n.|可控性|check controllability|Check controllability for the linearized system.|检查线性化系统的可控性。|线性系统结论不应无条件外推到全部非线性状态。
observability|n.|可观性|an observability test|The observability test uses the model and measurement equations.|可观性检验使用模型与测量方程。|可观性与实际估计精度不是同一个概念。
pole placement|n.|极点配置|a pole placement design|The pole placement design specifies the closed-loop poles.|极点配置设计指定闭环极点。|所需条件、输入限制和噪声敏感性仍需检查。`],
      ['观测与估计',`observer|n.|观测器|a state observer|The observer estimates states that are not directly measured.|观测器估计未被直接测量的状态。|observer 在这里不是普通的观察人员。
state estimation|n.|状态估计|a state estimation pipeline|The state estimation pipeline combines the available measurements.|状态估计流程融合可用测量。|注意时间同步、噪声模型和估计延迟。
Kalman filter|n.|卡尔曼滤波器|a Kalman filter update|The Kalman filter update combines prediction with measurement.|卡尔曼滤波更新结合预测与测量。|经典线性高斯设定与扩展版本的假设不同。
covariance|n.|协方差|an error covariance matrix|The covariance matrix describes uncertainty and correlation.|协方差矩阵描述不确定性及相关性。|对角项和非对角项含义不同，单位也可能不同。
innovation|n.|新息|the measurement innovation|The innovation compares the measurement with its prediction.|新息比较测量与其预测值。|估计语境中的 innovation 不是产品创新。`],
      ['二次型最优控制',`optimal control|n.|最优控制|an optimal control problem|The optimal control problem includes dynamics and an objective.|最优控制问题包含动力学和目标函数。|最优性总是相对于模型、约束与代价而言。
cost function|n.|代价函数|design a cost function|The cost function penalizes tracking error and control effort.|代价函数惩罚跟踪误差与控制消耗。|权重选择要考虑量纲和实际目标。
linear quadratic regulator|n.|线性二次型调节器|a linear quadratic regulator design|The linear quadratic regulator uses a quadratic cost.|线性二次型调节器使用二次代价。|常缩写为 LQR，适用条件和模型范围需说明。
Riccati equation|n.|黎卡提方程|solve a Riccati equation|Solve the Riccati equation for this LQR design.|为这个 LQR 设计求解黎卡提方程。|连续、离散及有限时域形式不同。
terminal cost|n.|终端代价|a terminal cost term|The terminal cost penalizes the final state error.|终端代价惩罚最终状态误差。|有限时域问题中要与阶段代价区分。`],
      ['采样与离散化',`discretization|n.|离散化|model discretization|Model discretization depends on the sampling assumptions.|模型离散化取决于采样假设。|动力学离散化与空间网格离散化需看语境。
sample time|n.|采样周期|a fixed sample time|Use the configured sample time in the discrete update.|在离散更新中使用配置的采样周期。|采样周期常用 s，频率是其倒数。
zero-order hold|n.|零阶保持|a zero-order hold assumption|The zero-order hold assumption keeps the input constant between samples.|零阶保持假设使输入在采样间隔内保持不变。|该输入假设影响离散模型。
sampling frequency|n.|采样频率|choose a sampling frequency|Choose the sampling frequency for the relevant signal bandwidth.|根据相关信号带宽选择采样频率。|采样频率、控制更新频率和仿真频率可能不同。
aliasing|n.|混叠|prevent aliasing|Use suitable filtering to reduce aliasing before sampling.|采样前使用合适滤波以减少混叠。|采样后通常无法单凭数据恢复被混叠的信息。`]
    ]},
    {title:'MPC 与轨迹优化',subtitle:'时域、约束和数值求解',color:'#8653b5',lessons:[
      ['预测控制的基本表达',`model predictive control|n.|模型预测控制|a model predictive control scheme|Model predictive control repeatedly solves a finite-horizon problem.|模型预测控制反复求解有限时域问题。|通常缩写为 MPC，闭环效果还依赖模型和实时求解。
prediction horizon|n.|预测时域|a longer prediction horizon|A longer prediction horizon changes the optimization workload.|更长的预测时域改变优化计算量。|说明指时间长度还是离散步数。
control horizon|n.|控制时域|a control horizon setting|The control horizon setting determines the optimized input sequence length.|控制时域设置决定所优化输入序列的长度。|与预测时域不必相等，取决于参数化方式。
receding horizon|n.|滚动时域|a receding horizon strategy|The receding horizon strategy updates the plan after new measurements.|滚动时域策略在获得新测量后更新计划。|通常只执行当前求解序列的前一部分。
warm start|n.|热启动|a warm start guess|Use the previous solution as a warm start guess.|用上一次解作为热启动初值。|热启动可能加速求解，但不保证新问题可行。`],
      ['优化问题的性质',`quadratic programming|n.|二次规划|a quadratic programming problem|This quadratic programming problem has linear constraints.|这个二次规划问题具有线性约束。|通常缩写 QP，凸性还取决于二次项。
nonlinear programming|n.|非线性规划|a nonlinear programming solver|The nonlinear programming solver handles this trajectory problem.|非线性规划求解器处理这个轨迹问题。|通常缩写 NLP，不保证总能找到全局最优解。
convexity|n.|凸性|check convexity|Check convexity before making a global optimality claim.|宣称全局最优性之前先检查凸性。|可行集与目标函数的性质都重要。
local minimum|n.|局部最小值|a local minimum solution|The solver may stop at a local minimum.|求解器可能停在一个局部最小值。|局部最小不等于全局最小。
global minimum|n.|全局最小值|a global minimum guarantee|A global minimum guarantee requires additional conditions.|全局最小值保证需要额外条件。|不要根据一次低代价值就宣布全局最优。`],
      ['决策量与软约束',`decision variable|n.|决策变量|an optimization decision variable|Each decision variable represents a planned state or input.|每个决策变量表示计划中的状态或输入。|不同转录方式使用不同的决策变量集合。
equality constraint|n.|等式约束|a dynamics equality constraint|The equality constraint enforces the discrete dynamics.|等式约束强制满足离散动力学。|求解时还需考虑数值容差。
inequality constraint|n.|不等式约束|a joint inequality constraint|The inequality constraint limits the joint velocity.|不等式约束限制关节速度。|检查不等号方向及变量单位。
slack variable|n.|松弛变量|introduce a slack variable|Introduce a slack variable for the soft tracking constraint.|为软跟踪约束引入松弛变量。|通常需要在代价中惩罚松弛量。
soft constraint|n.|软约束|a penalized soft constraint|A soft constraint allows a penalized violation.|软约束允许带惩罚的违反。|与禁止违反的硬约束有不同含义。`],
      ['可行性与终端条件',`hard constraint|n.|硬约束|a hard input constraint|The hard constraint limits the allowed input.|硬约束限制允许的输入。|模型中的硬约束仍需可靠执行和数值检查。
feasibility|n.|可行性|check feasibility|Check feasibility before applying the planned command.|应用计划指令前检查可行性。|可行性与代价是否最优是不同问题。
recursive feasibility|n.|递归可行性|a recursive feasibility argument|The recursive feasibility argument uses specific assumptions.|递归可行性论证使用特定假设。|关注后续时刻是否仍存在可行解。
terminal set|n.|终端集合|a terminal set constraint|The terminal set constraint restricts the predicted final state.|终端集合约束限制预测的最终状态。|终端集合通常需要与控制律和理论条件配合。
constraint tightening|n.|约束收紧|robust constraint tightening|Constraint tightening reserves a margin for uncertainty.|约束收紧为不确定性预留裕量。|收紧幅度需要与不确定性假设相匹配。`],
      ['轨迹优化方法',`trajectory optimization|n.|轨迹优化|a trajectory optimization problem|Trajectory optimization selects a motion under dynamics and constraints.|轨迹优化在动力学与约束下选择运动。|需要交代离散化、初始化和求解收敛条件。
direct collocation|n.|直接配点法|a direct collocation formulation|Direct collocation introduces state variables at selected points.|直接配点法在选定点引入状态变量。|通过离散缺陷或配点约束表达动力学关系。
direct shooting|n.|直接打靶法|a direct shooting method|Direct shooting simulates states from a parameterized input sequence.|直接打靶法根据参数化输入序列仿真状态。|状态对输入的敏感性可能影响数值条件。
line search|n.|线搜索|a line search step|The line search selects a step length along the direction.|线搜索沿指定方向选择步长。|不同方法使用不同的接受条件。
trust region|n.|信赖域|a trust region method|The trust region limits where the local approximation is used.|信赖域限制局部近似的使用范围。|这是数值优化方法，不是安全区域的直接保证。`]
    ]},
    {title:'接触 抓持与灵巧手',subtitle:'接触力、手部结构与柔顺交互',color:'#b15a23',lessons:[
      ['接触力的方向与范围',`normal force|n.|法向力|a contact normal force|The normal force acts along the contact normal.|法向力沿接触法线方向作用。|法线朝向和力的正方向必须一致。
tangential force|n.|切向力|a tangential contact force|The tangential force lies in the local contact plane.|切向力位于局部接触平面内。|切向基向量和摩擦模型影响分量表示。
friction cone|n.|摩擦锥|a friction cone constraint|The friction cone constraint limits admissible contact forces.|摩擦锥约束限制可容许的接触力。|常见库仑模型下与法向力和摩擦系数相关。
coefficient of friction|n.|摩擦系数|estimate the coefficient of friction|Estimate the coefficient of friction for the contact pair.|估计接触材料对的摩擦系数。|静摩擦、动摩擦和方向性可能需要区分。
contact patch|n.|接触斑或接触区域|a finite contact patch|A finite contact patch can support distributed pressure.|有限接触区域可以承载分布式压力。|点接触与有限区域接触模型有不同假设。`],
      ['抓持分析',`force closure|n.|力封闭|a force closure grasp|We test whether the contact arrangement provides force closure.|我们检验接触布局是否实现力封闭。|定义依接触模型及允许的接触力而定。
form closure|n.|形封闭|a form closure condition|The form closure condition concerns geometric immobilization.|形封闭条件关注几何上的运动约束。|不要与依赖摩擦力能力的力封闭混为一谈。
grasp matrix|n.|抓持矩阵|construct the grasp matrix|The grasp matrix maps contact forces to an object wrench.|抓持矩阵把接触力映射到物体力旋量。|要说明参考点、坐标系和接触力参数化。
grasp quality|n.|抓持质量|a grasp quality metric|The grasp quality metric depends on the chosen task assumptions.|抓持质量指标取决于所选任务假设。|单一分数不能代表所有操作任务中的表现。
grasp wrench space|n.|抓持力旋量空间|approximate the grasp wrench space|The grasp wrench space summarizes achievable object wrenches.|抓持力旋量空间概括可实现的物体力旋量。|其形状依接触位置、摩擦及力限制而变。`],
      ['手部结构',`fingertip|n.|指尖|a fingertip contact|The fingertip contact changes as the object rotates.|物体旋转时，指尖接触发生变化。|指尖位置、法线和接触区域是不同描述量。
phalanx|n.|指节骨段|the distal phalanx|The distal phalanx supports the fingertip sensor.|远端指节支撑指尖传感器。|复数为 phalanges；机器人中可对应手指连杆。
palm|n.|手掌|the palm frame|Express the object pose in the palm frame.|在手掌坐标系下表达物体位姿。|palm contact 表示物体与手掌的接触。
thumb|n.|拇指|the thumb workspace|The thumb workspace affects the reachable grasp configurations.|拇指工作空间影响可达抓持构型。|关注拇指机构、驱动耦合与相对掌面的方向。
opposition|n.|对掌或对置运动|thumb opposition|Thumb opposition supports several precision grasps.|拇指对掌运动支持多种精细抓持。|手部语境中不同于一般的反对或对抗。`],
      ['驱动结构与抓型',`underactuation|n.|欠驱动|mechanical underactuation|Underactuation couples the motion of several joints.|欠驱动使多个关节的运动产生耦合。|独立驱动数量少于相关自由度时需要考虑耦合。
tendon routing|n.|腱绳走线|design the tendon routing|Tendon routing affects the joint torque mapping.|腱绳走线影响关节转矩映射。|还需考虑摩擦、力臂变化和机构限制。
synergy|n.|协同模式|a hand synergy|The hand synergy reduces the dimension of the command.|手部协同模式降低指令维度。|降维可能限制可表达的手部构型。
power grasp|n.|强力抓持|a power grasp posture|The power grasp uses broad contact to hold the object.|强力抓持利用较广泛的接触握持物体。|抓型分类要结合手掌和手指的实际接触。
precision grasp|n.|精细抓持|a precision grasp task|The precision grasp task relies on carefully placed fingertip contacts.|精细抓持任务依赖精确布置的指尖接触。|稳定抓住不自动等于具备手内操作能力。`],
      ['触觉与力交互',`tactile sensing|n.|触觉感知|a tactile sensing system|Tactile sensing provides information about local contact.|触觉感知提供局部接触信息。|信息类型依具体传感器结构而变。
tactile sensor|n.|触觉传感器|a fingertip tactile sensor|The tactile sensor detects changes in the contact pattern.|触觉传感器检测接触模式的变化。|需关注标定、漂移、采样频率和覆盖范围。
pressure distribution|n.|压力分布|estimate the pressure distribution|The pressure distribution changes during rolling contact.|滚动接触过程中压力分布发生变化。|压力是单位面积上的力，不能直接和总力等同。
force control|n.|力控制|a force control loop|The force control loop regulates the measured contact force.|力控制回路调节测得的接触力。|接触环境、反馈延迟与执行器限制很重要。
admittance control|n.|导纳控制|an admittance control law|The admittance control law generates motion from measured force.|导纳控制律根据测得的力生成运动。|需与阻抗控制的输入输出组织方式区分。`]
    ]}
  );
  weeks.push(
    {title:'物理仿真与数值设置',subtitle:'时间步、几何、接触与运行方式',color:'#1c62d6',lessons:[
      ['仿真时间与求解',`time step|n.|时间步长|a simulation time step|Reduce the time step to examine the integration error.|减小时间步长以考察积分误差。|减小步长通常增加计算量，不自动修复错误模型。
substep|n.|子步|a physics substep|The simulator advances several substeps per control update.|仿真器在每次控制更新之间推进多个子步。|控制周期与物理子步的关系需要明确。
integrator|n.|积分器|a numerical integrator|Choose an integrator appropriate for the system dynamics.|选择适合系统动力学的积分器。|不同积分方法有不同稳定性和成本。
numerical stability|n.|数值稳定性|check numerical stability|Check numerical stability when changing the contact stiffness.|改变接触刚度时检查数值稳定性。|数值稳定与真实控制系统稳定是不同问题。
solver tolerance|n.|求解器容差|set the solver tolerance|Set the solver tolerance according to the required accuracy.|根据所需精度设置求解器容差。|容差越严格不代表模型本身越真实。`],
      ['碰撞与显示几何',`collision geometry|n.|碰撞几何|simplified collision geometry|Simplified collision geometry reduces collision computation.|简化碰撞几何可以减少碰撞计算。|简化可能影响接触位置及可操作性判断。
visual geometry|n.|显示几何|detailed visual geometry|The visual geometry does not always match the collision model.|显示几何不一定与碰撞模型相同。|外观看起来接触不代表物理碰撞模型已经接触。
mesh|n.|网格|a triangular mesh|The object surface is represented by a triangular mesh.|物体表面由三角网格表示。|网格尺度、拓扑和单位都可能影响导入结果。
convex hull|n.|凸包|compute a convex hull|The convex hull encloses the original geometry.|凸包包围原始几何体。|凸包可能填平凹陷，改变接触和碰撞结果。
collision margin|n.|碰撞裕量|a collision margin setting|The collision margin setting affects when contact is considered.|碰撞裕量设置影响何时考虑接触。|具体含义依仿真引擎的几何与接触实现而定。`],
      ['接触模型',`contact model|n.|接触模型|a compliant contact model|The contact model determines how forces arise at contact.|接触模型决定接触处如何产生力。|不要默认不同引擎的参数具有相同物理意义。
restitution|n.|恢复或反弹特性|a coefficient of restitution|The coefficient of restitution describes the modeled rebound.|恢复系数描述模型中的反弹特性。|不同接触求解方法对恢复行为的处理不同。
penetration|n.|穿透或接触压入|contact penetration|Measure contact penetration when tuning the soft contact model.|调整软接触模型时测量接触压入。|软接触中的有限压入不总代表碰撞检测失败。
contact impulse|n.|接触冲量|an accumulated contact impulse|The contact impulse represents force integrated over time.|接触冲量表示力对时间的积分。|冲量与瞬时力的单位不同。
constraint solver|n.|约束求解器|an iterative constraint solver|The constraint solver resolves the active contact constraints.|约束求解器处理激活的接触约束。|迭代次数、容差与问题条件共同影响结果。`],
      ['多体与关节参数',`rigid-body simulation|n.|刚体仿真|a rigid-body simulation scene|The rigid-body simulation scene contains several interacting objects.|刚体仿真场景包含多个相互作用的物体。|刚体假设与软材料的真实形变可能存在差距。
multibody system|n.|多体系统|a constrained multibody system|The multibody system includes links and joint constraints.|多体系统包含连杆和关节约束。|约束类型影响自由度与求解方式。
articulation|n.|关节连接的多体结构|a robot articulation|The articulation groups the connected robot links.|关节连接结构组织相互连接的机器人连杆。|在仿真框架中是有具体语义的对象类型。
joint damping|n.|关节阻尼|a joint damping parameter|The joint damping parameter affects passive motion.|关节阻尼参数影响被动运动。|单位和模型形式需以具体引擎约定为准。
joint friction|n.|关节摩擦|identify joint friction|Identify joint friction from suitable motion experiments.|通过合适的运动实验辨识关节摩擦。|不要用任意大摩擦掩盖不稳定控制。`],
      ['仿真运行环境',`simulation environment|n.|仿真环境|a reproducible simulation environment|The simulation environment includes the scene and task configuration.|仿真环境包含场景和任务配置。|记录引擎版本、资产和运行参数有助于复现。
physics engine|n.|物理引擎|a physics engine setting|The physics engine setting affects contact behavior.|物理引擎设置影响接触行为。|换引擎后不能直接假设训练分布保持一致。
rendering|n.|渲染|real-time rendering|Rendering produces the visual observation used by the policy.|渲染生成策略使用的视觉观测。|渲染帧率和物理更新率可以不同。
headless mode|n.|无界面模式|run in headless mode|Run the training job in headless mode.|以无界面模式运行训练任务。|无可见窗口不一定意味着完全不使用图形计算。
real-time factor|n.|实时因子|measure the real-time factor|The real-time factor compares simulated time with wall-clock time.|实时因子比较仿真时间与实际运行时间。|报告比值定义，避免把快慢方向写反。`]
    ]},
    {title:'强化学习核心词汇',subtitle:'交互、价值、策略与训练数据',color:'#087e80',lessons:[
      ['智能体与环境',`reinforcement learning|n.|强化学习|a reinforcement learning task|The reinforcement learning task specifies rewards and interactions.|强化学习任务规定奖励和交互方式。|训练能运行不等于学到了目标技能。
agent|n.|智能体|a learning agent|The agent selects an action from its observation.|智能体根据观测选择动作。|agent 在软件架构和强化学习中语义略有不同。
environment|n.|环境|interact with the environment|The agent interacts with the environment at each step.|智能体在每一步与环境交互。|明确环境状态、观测和任务终止条件。
observation|n.|观测|a partial observation|The observation contains joint positions and tactile features.|观测包含关节位置和触觉特征。|观测通常不等于环境的全部真实状态。
action space|n.|动作空间|a continuous action space|The action space defines the commands available to the policy.|动作空间定义策略可选择的指令。|动作可以是位置、速度、力矩或高层指令。`],
      ['回合与数据片段',`reward|n.|奖励|a scalar reward|The reward encourages progress toward the task objective.|奖励鼓励向任务目标取得进展。|奖励设计可能产生与真实目标不一致的行为。
return|n.|回报|expected return|The objective is to improve expected return.|目标是提高期望回报。|回报聚合多个时刻的奖励，定义可含折扣。
episode|n.|回合|an episode termination|The episode ends when the termination condition is met.|满足终止条件时，该回合结束。|区分任务终止与时间截断的含义。
rollout|n.|交互轨迹采集|collect a rollout|Collect a rollout using the current policy.|使用当前策略采集一段交互轨迹。|rollout 可指一段执行数据或采集过程。
transition|n.|状态转移样本|store a transition|Store the transition with its reward and next observation.|保存包含奖励和下一观测的转移样本。|还应正确记录终止或截断标记。`],
      ['策略与价值',`policy|n.|策略|a stochastic policy|The policy maps observations to actions or action distributions.|策略把观测映射到动作或动作分布。|随机策略与确定性策略的输出形式不同。
value function|n.|价值函数|estimate a value function|The value function estimates future return from a state.|价值函数估计从某个状态开始的未来回报。|其定义依策略、奖励和折扣设置而定。
action-value function|n.|动作价值函数|an action-value estimate|The action-value function evaluates a state-action pair.|动作价值函数评价一个状态动作对。|常记为 Q，与只以状态为输入的 V 区分。
advantage|n.|优势量|an advantage estimate|The advantage estimate compares an action with a reference value.|优势估计比较某个动作与参考价值。|强化学习语境中的 advantage 不只是一般优点。
discount factor|n.|折扣因子|choose a discount factor|The discount factor changes the weight of future rewards.|折扣因子改变未来奖励的权重。|采样周期变化时，同一数值对应的时间偏好会变化。`],
      ['策略优化与探索',`policy gradient|n.|策略梯度|a policy gradient estimate|The policy gradient estimate guides the policy update.|策略梯度估计指导策略更新。|梯度估计的方差和偏差会影响训练。
actor|n.|策略网络或行动者|an actor network|The actor network produces the action distribution.|策略网络输出动作分布。|在 actor-critic 架构中与 critic 分工。
critic|n.|价值评估器|a critic network|The critic network estimates a value used during training.|价值评估网络估计训练中使用的价值。|critic 不一定直接选择最终动作。
exploration|n.|探索|encourage exploration|The training setup encourages exploration of useful behaviors.|训练设置鼓励探索有用行为。|真机探索必须受到实际约束和保护。
exploitation|n.|利用已有知识|balance exploration and exploitation|The policy balances exploration and exploitation.|策略在探索与利用已有知识之间权衡。|在此不表示一般意义上的剥削。`],
      ['数据使用方式',`on-policy|adj.|同策略的|an on-policy method|An on-policy method uses data associated with the policy being improved.|同策略方法使用与正在改进的策略相关的数据。|具体数据复用规则还依算法而定。
off-policy|adj.|异策略的|an off-policy method|An off-policy method can learn from data collected by another policy.|异策略方法可以从其他策略采集的数据中学习。|可复用数据不代表任意分布的数据都同样有效。
replay buffer|n.|经验回放缓冲区|sample a replay buffer|Sample the replay buffer to construct a training batch.|从经验回放缓冲区抽样构造训练批次。|抽样方式及数据新旧程度会影响训练分布。
temporal difference|n.|时序差分|a temporal difference target|The temporal difference target uses a bootstrapped value estimate.|时序差分目标使用自举的价值估计。|bootstrap 在这里不是重新采集完整回报。
entropy regularization|n.|熵正则化|an entropy regularization term|The entropy regularization term encourages a broader action distribution.|熵正则项鼓励更广的动作分布。|具体作用依符号、权重及策略形式而定。`]
    ]},
    {title:'模仿学习与仿真迁移',subtitle:'示范、分布差异与系统辨识',color:'#8653b5',lessons:[
      ['从示范学习',`imitation learning|n.|模仿学习|an imitation learning pipeline|The imitation learning pipeline uses demonstrations of the task.|模仿学习流程使用任务示范。|示范质量、覆盖范围和部署分布都重要。
demonstration|n.|示范数据|an expert demonstration|The demonstration records observations and corresponding actions.|示范记录观测及相应动作。|需要明确时间对齐、动作定义和采集条件。
expert policy|n.|专家策略|query an expert policy|The expert policy provides reference actions for training.|专家策略为训练提供参考动作。|专家可能来自人、规划器或其他控制器。
behavior cloning|n.|行为克隆|a behavior cloning model|Behavior cloning learns an observation-action mapping from demonstrations.|行为克隆从示范学习观测到动作的映射。|常作为监督学习基线，需关注部署时的状态分布。
covariate shift|n.|协变量偏移|covariate shift at deployment|Covariate shift can make the cloned policy visit unfamiliar states.|协变量偏移可能使克隆策略进入不熟悉的状态。|不是所有分布变化都属于同一种偏移假设。`],
      ['数据分布与离线学习',`dataset aggregation|n.|数据集聚合|a dataset aggregation procedure|Dataset aggregation adds labels for states visited by the learner.|数据集聚合为学习者访问的状态增加标签。|DAgger 是相关方法，需说明专家查询和混合策略。
inverse reinforcement learning|n.|逆强化学习|an inverse reinforcement learning problem|Inverse reinforcement learning infers a reward explanation from behavior.|逆强化学习从行为推断奖励层面的解释。|奖励通常存在不唯一性和额外假设。
offline reinforcement learning|n.|离线强化学习|an offline reinforcement learning dataset|Offline reinforcement learning uses a fixed interaction dataset.|离线强化学习使用固定的交互数据集。|超出数据覆盖范围的动作评估尤其困难。
distribution shift|n.|分布偏移|measure distribution shift|Distribution shift appears when deployment conditions differ from training.|部署条件与训练条件不同时会出现分布偏移。|说明是状态、观测、动力学还是任务发生变化。
out-of-distribution|adj.|分布外的|an out-of-distribution object|The out-of-distribution object differs from the training objects.|这个分布外物体与训练物体不同。|分布外需相对于具体训练或评测分布定义。`],
      ['缩小仿真与真实差距',`sim-to-real|n.|仿真到真实迁移|a sim-to-real evaluation|The sim-to-real evaluation tests the policy on physical hardware.|仿真到真实迁移评估在真实硬件上测试策略。|仿真成功不能直接证明真机适用。
domain randomization|n.|域随机化|apply domain randomization|Domain randomization varies selected simulation parameters during training.|域随机化在训练期间改变选定的仿真参数。|随机范围与真实系统差异需要有合理依据。
system identification|n.|系统辨识|a system identification experiment|System identification estimates model parameters from measurements.|系统辨识根据测量估计模型参数。|激励、可辨识性和噪声会影响结果。
reality gap|n.|仿真与真实差距|reduce the reality gap|The reality gap includes errors in dynamics and sensing.|仿真与真实差距包含动力学和传感误差。|它不只是图像外观不一致。
domain adaptation|n.|域适应|a domain adaptation method|Domain adaptation adjusts a model for a different data domain.|域适应调整模型以适应不同数据域。|与训练时随机化仿真参数不是同一个操作。`],
      ['传感与驱动差异',`observation noise|n.|观测噪声|inject observation noise|Inject observation noise to study the policy sensitivity.|注入观测噪声以研究策略敏感性。|噪声分布、相关性和幅值都需说明。
action delay|n.|动作延迟|model an action delay|The action delay changes when the command affects the system.|动作延迟改变指令作用于系统的时刻。|离散延迟步数要结合控制周期换算。
sensor bias|n.|传感器偏置|estimate sensor bias|Estimate sensor bias before interpreting the force measurements.|解读力测量之前先估计传感器偏置。|偏置与零均值随机噪声的影响不同。
actuator dynamics|n.|执行器动力学|identify actuator dynamics|Actuator dynamics affect the realized torque response.|执行器动力学影响实际转矩响应。|不能默认控制指令会无延迟且无误差地执行。
parameter uncertainty|n.|参数不确定性|a parameter uncertainty range|Specify the parameter uncertainty range used in training.|说明训练中使用的参数不确定性范围。|范围应结合辨识、测量或敏感性分析。`],
      ['任务难度与奖励设计',`curriculum learning|n.|课程学习|a curriculum learning schedule|Curriculum learning changes the task difficulty during training.|课程学习在训练过程中改变任务难度。|难度指标与进阶条件应可复现。
reward shaping|n.|奖励塑形|a reward shaping term|The reward shaping term provides additional learning guidance.|奖励塑形项提供额外学习引导。|额外奖励可能改变目标偏好，需检查设计条件。
sparse reward|n.|稀疏奖励|a sparse reward task|The sparse reward is received only after a successful grasp.|只有成功抓持后才获得这项稀疏奖励。|稀疏主要描述有信息奖励出现的频度。
dense reward|n.|稠密奖励|a dense reward signal|The dense reward provides feedback at many steps.|稠密奖励在许多步骤提供反馈。|反馈密集不代表与最终任务目标一致。
privileged information|n.|特权信息|train with privileged information|The teacher uses privileged information unavailable during deployment.|教师使用部署时无法获得的特权信息。|训练与部署可用信息之间的差异需要显式处理。`]
    ]},
    {title:'实验统计与数值计算',subtitle:'抽样、误差、梯度与可复现训练',color:'#b15a23',lessons:[
      ['数据与抽样',`statistics|n.|统计学或统计量|descriptive statistics|Use descriptive statistics to summarize the experiment outcomes.|用描述性统计概括实验结果。|statistics 可指学科，也可指多个统计量。
sample|n.|样本|an independent sample|Each sample records one outcome under the specified condition.|每个样本记录指定条件下的一次结果。|时间序列中的相邻样本不一定独立。
population|n.|总体|the target population|The target population defines which tasks the claim covers.|目标总体定义结论覆盖哪些任务。|抽样总体与希望推广到的对象可能不同。
distribution|n.|分布|a probability distribution|The distribution describes the variability of the measurements.|分布描述测量的变异情况。|分布的形状不必总是假设为高斯。
random seed|n.|随机种子|record the random seed|Record the random seed for each training run.|记录每次训练运行的随机种子。|固定种子不一定消除并行与硬件造成的不确定性。`],
      ['统计量与不确定性',`mean|n.|均值|the sample mean|Report the sample mean across independent runs.|报告独立运行之间的样本均值。|均值可能受异常值影响，需要结合分布理解。
variance|n.|方差|estimate the variance|Estimate the variance of the measured error.|估计测量误差的方差。|方差的单位是原量单位的平方。
standard deviation|n.|标准差|report the standard deviation|Report the standard deviation together with the mean.|在均值旁同时报告标准差。|标准差与标准误不是同一个量。
confidence interval|n.|置信区间|a confidence interval estimate|The confidence interval communicates sampling uncertainty.|置信区间表达抽样不确定性。|解释依赖构造方法和统计假设。
effect size|n.|效应量|a practical effect size|Consider the effect size when comparing the methods.|比较方法时考虑效应量。|统计显著不自动等于实际改善幅度大。`],
      ['尺度与梯度',`normalization|n.|归一化|observation normalization|Observation normalization changes the input scale.|观测归一化改变输入尺度。|说明采用的具体公式，不与标准化混为一谈。
standardization|n.|标准化|feature standardization|Feature standardization can use a training mean and scale.|特征标准化可以使用训练集的均值和尺度。|评测时不要无意泄漏测试集统计信息。
gradient|n.|梯度|a cost gradient|The gradient gives local sensitivity to the decision variables.|梯度给出对决策变量的局部敏感性。|梯度方向的含义依变量尺度和内积而定。
automatic differentiation|n.|自动微分|use automatic differentiation|Automatic differentiation computes derivatives through the program.|自动微分沿程序计算导数。|它不同于数值差分，也不直接等于符号求导。
finite difference|n.|有限差分|a finite difference check|Use a finite difference check to inspect the gradient implementation.|用有限差分检查梯度实现。|差分步长要平衡截断误差和浮点误差。`],
      ['数值误差与问题条件',`numerical precision|n.|数值精度|limited numerical precision|Limited numerical precision affects small residuals.|有限数值精度影响很小的残差。|数值表示精度不等于模型预测精度。
floating-point error|n.|浮点误差|accumulated floating-point error|Repeated operations can accumulate floating-point error.|重复运算可能累积浮点误差。|不要普遍使用浮点数严格相等来比较计算结果。
conditioning|n.|条件性|poor problem conditioning|Poor conditioning makes the solution sensitive to small input changes.|较差的条件性使解对小输入变化敏感。|问题的条件性与算法的数值稳定性需区分。
residual|n.|残差|an optimization residual|Inspect the residual before accepting the numerical solution.|接受数值解前检查残差。|残差的定义及缩放会影响阈值判断。
regularization|n.|正则化|a regularization penalty|The regularization penalty discourages a chosen form of complexity.|正则化惩罚抑制所选形式的复杂性。|正则化会引入偏好，需交代权重与目的。`],
      ['实验可复现性',`reproducibility|n.|可复现性|improve experiment reproducibility|Reproducibility requires code, data, configuration, and evaluation details.|可复现性需要代码、数据、配置和评估细节。|不同学科对 reproducibility 与 replicability 的用法有差异。
checkpoint|n.|检查点|save a training checkpoint|Save a checkpoint together with the optimizer state.|保存检查点时一并保存优化器状态。|继续训练通常还需要步数、随机状态和配置。
hyperparameter|n.|超参数|a training hyperparameter|Document each hyperparameter used in the final experiment.|记录最终实验使用的每项超参数。|区分学习得到的参数与外部设置的超参数。
learning rate|n.|学习率|a learning rate schedule|The learning rate schedule changes the update step size.|学习率计划改变更新步长。|合适的学习率依优化器、尺度和训练阶段而定。
batch size|n.|批大小|choose a batch size|The batch size affects memory use and gradient estimates.|批大小影响内存使用和梯度估计。|并行环境数量、采样批次和优化小批次需区分。`]
    ]}
  );
  if(typeof module!=='undefined'&&module.exports)module.exports=weeks;
  else root.ProfessionalVocabulary=weeks;
})(typeof globalThis!=='undefined'?globalThis:this);
