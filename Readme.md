The objective of this project is to design and implement an artificial intelligence system that can proficiently play Uno, a dynamic and strategic card game. Uno, known for its blend of chance and decision-making, requires strategic card play, adept card matching, and adaptability to opponents' actions. The goal is to develop an AI that not only comprehends the rules of the game but also exhibits human-like gameplay, considering factors such as strategic decision-making, precise card matching, and an understanding of opponents' strategies. The aim is to create an AI system that provides a challenging and enjoyable gaming experience, ensuring seamless integration with the rules and dynamics of Uno while engaging players in a manner that mirrors human intelligence.
1.2.1 Card Matching: The AI needs to recognize and match cards based on color, number, or action, ensuring it follows the game's rules accurately.

1.2.2 Decision-Making: The AI should make intelligent decisions during its turn, considering factors like playing action cards strategically and adapting its strategy based on the current game state.
1.2.3 Opponent Modeling: The AI should be able to analyze and adapt to different playing styles, predicting opponents' moves and adjusting its strategy accordingly.

What We Aim to Achieve:
At the end of this project, we aim to have a fully functional Uno AI system that satisfies the following criteria:
Competitive Gameplay: The AI consistently plays Uno in a manner that challenges and engages players, providing a competitive experience.
Adaptability: The AI adapts its strategy based on changing game conditions, opponents' actions, and different player styles.
2. Methodology
To initiate the development of Uno, we adopt a table-driven approach by establishing a comprehensive set of rules. This ensures that the AI operates in accordance with defined guidelines, allowing for systematic and efficient implementation[4].
2.2 Intelligent Agent

The Q-Learning algorithm[13] emerges as a strategic solution for optimizing decisions in the context of the Uno AI project. Its distinctive strength lies in its ability to navigate between immediate rewards and delayed reinforcements. In the Uno AI scenario, at each step, the agent observes the current game state vector (xt) and strategically selects and applies an action (ut). Upon transitioning to the next state (xt+1), the agent receives reinforcement (r(xt, ut)). The training objective is to determine a sequential series of actions that maximizes the cumulative sum of future reinforcements, ultimately leading to an intelligent decision-making process for the Uno AI and facilitating the most efficient path from the initial game state to a winning outcome.

In its basic form, Q-learning works in a similar way. However, while MC waits for the completion of each episode before updating q-values, Q-learning updates them with a lag of one step, at each step.


Q-value update function
The q-value is thereby dependent on the step-size parameter, the reward of the next step r, and the q-value of the next step at state s-hat and action-hat.

Both algorithms consequently take the same 2 parameters which have the following effects:

Alpha: A higher step size parameter increases the change in q-values at each update while prohibiting values to converge closer to their true optimum
Epsilon: A higher epsilon grants more exploration of actions, which do not appear profitable at first sight. At the same time, this dilutes the optimal game strategy when it has been picked up by the agent.

The strategy employed for the Uno AI centers around leveraging the Q-Learning algorithm to instill intelligent decision-making. The key elements of our strategy include:

We are focusing on creating an AI which can easily identify the moves and play accordingly with these steps:
