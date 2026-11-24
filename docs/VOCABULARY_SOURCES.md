# 专业词汇选材与资料

课程面向机器人与运动控制工程师的阅读和表达场景，按工作任务分组，共 500 个学习目标。其中包含单词和具有独立专业含义的短语，不靠大小写、单复数或连字符变体凑数量。词条释义强调本课语境，不罗列词典中的全部含义。

新增 400 项包括软件工程与 ROS 2、机器人几何与动力学、控制与接触操作、仿真与学习控制。每项的搭配、例句、译文和用法提示为课程原创教学内容，不是从文档逐句摘录。以下资料用于核对部分领域术语和概念边界，并为继续阅读提供入口；词表未进行语料频率排名。

| 主题 | 一手资料 | 本课关注的术语或区别 |
| --- | --- | --- |
| Python | [Python 官方教程](https://docs.python.org/3/tutorial/controlflow.html) | function、argument、parameter、scope 等接口表达 |
| ROS 2 | [ROS 2 Jazzy QoS 官方文档源码](https://github.com/ros2/ros2_documentation/blob/jazzy/source/Concepts/Intermediate/About-Quality-of-Service-Settings.rst) | reliability、durability、history、deadline、liveliness |
| 轨迹优化 | [MIT Underactuated Robotics 轨迹优化章节](https://underactuated.mit.edu/trajopt.html) | direct shooting、direct collocation、receding horizon、约束与局部最优 |
| 接触与操作 | [MIT Robotic Manipulation 力与接触章节](https://manipulation.mit.edu/force.html) | contact force、wrench、friction cone、接触假设 |
| 物理仿真 | [MuJoCo 官方计算原理](https://mujoco.readthedocs.io/en/stable/computation/index.html) | generalized coordinates、contact model、constraint solver 与数值实现 |
| 强化学习 | [OpenAI Spinning Up 核心概念](https://spinningup.openai.com/en/latest/spinningup/rl_intro.html) | observation 与 state、reward 与 return、policy 与 value function |
| 仿真迁移 | [NVIDIA Isaac Lab 学习资料中的仿真增强](https://docs.nvidia.com/learning/physical-ai/getting-started-with-isaac-lab/latest/transfer-policies-from-simulation-to-reality/03-bridging-the-gap-simulation-enhancement/index.html) | domain randomization、reality gap、system identification、privileged information |

课程使用框架无关的英文表达，不提供依赖某个最新版本的 API 调用示范。ROS 2 的概念核对以 Jazzy 文档为参考。仿真引擎的参数含义、矩阵排列、坐标系、单位及算法条件仍应以实际项目版本和模型约定为准。

例如，executor 是 ROS 2 中调度回调的组件，actuator 是机器人执行器；innovation 在状态估计中是新息；feasibility 表示满足约束，不等于 optimality。词条提示会保留这些区别，帮助从认识中文释义过渡到准确使用英文。
