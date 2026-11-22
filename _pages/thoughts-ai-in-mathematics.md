---
layout: single
title: "On the Recent Development of AI in Mathematics"
permalink: /thoughts/ai-in-mathematics/
author_profile: true
---

[All Thoughts]({{ '/thoughts/' | relative_url }})

[中文](#chinese) · [English](#english)

<div lang="zh-CN" markdown="1">

## 对近期数学界中的AI的一点评述 {#chinese}

> It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way.
>
> —— Charles Dickens, *A Tale Of Two Cities*

2026 年 11 月 20 日，距 Riemann 诞辰两百周年刚过两个月，Anthropic 的数学家 Levent Alpöge 发布了一篇四页的短文，宣称他与 Claude 合作找到了 Riemann hypothesis 的证明，并公开了相应的 Lean 代码。我无意，也自认为没有资格，指点整个数学界应当如何在这场浪潮中为自己定位。我只愿借此文，和同样关心数学的人谈谈自己的看法。至于一个学数学的人在 AI 时代应当如何自处，下面是我给自己的答卷。（[Alpöge 的说明](https://alpo.ge/remark.pdf)，[Riemann 生平](https://mathshistory.st-andrews.ac.uk/Biographies/Riemann/)）

近日谈论数学，很容易让人想起 Dickens 笔下那些只肯用最高级谈论自己时代的人。我更在意 Alpöge 在短文里提起的一件私事。早在学生时代，他就打算用几十年研究黎曼猜想，当年读什么书、学哪些数学，都多少与这个打算有关。如今他相信自己终于找到了证明，谈起这项成果，却也写到了失落。

### 一、关于数学

> die mathematische Wissenschaft ist meiner Ansicht nach ein unteilbares Ganze, ein Organismus, dessen Lebensfähigkeit durch den Zusammenhang seiner Teile bedingt wird. Denn bei aller Verschiedenheit des mathematischen Wissenstoffes im Einzelnen, gewahren wir doch sehr deutlich die Gleichheit der logischen Hülfsmittel, die Verwandtschaft der Ideenbildungen in der ganzen Mathematik und die zahlreichen Analogieen in ihren verschiedenen Wissensgebieten. Auch bemerken wir: je weiter eine mathematische Theorie ausgebildet wird, desto harmonischer und einheitlicher gestaltet sich ihr Aufbau und ungeahnte Beziehungen zwischen bisher getrennten Wissenszweigen werden entdeckt. So kommt es, daß mit der Ausdehnung der Mathematik ihr einheitlicher Charakter nicht verloren geht, sondern desto deutlicher offenbar wird.
>
> —— David Hilbert, *Mathematische Probleme*

人说自己喜欢数学，喜欢的是数学，还是「数学好」这个身份？对我自己而言，恐怕两者都有。独自想通一个问题，我会高兴，比身边的人先想通，又会多高兴一点。从考试、竞赛到论文发表，我们给过这个「先」字许多实在的奖赏，也习惯了把奖赏理解为自己应得的东西。如今若有一个模型先于我给出了证明，我总该问一问，自己觉得失落，究竟是舍不得那个问题，还是舍不得旁人原来看我的眼光。

不过，确实有一些数学，我早已知道结论，还是愿意花时间去想。给一条闭曲线选定一个稳定标架，我想知道它能否成为一张紧曲面的全部边界，连同指定的标架也一起延伸过去。从几何上问，眼前要找的是一张曲面。从 stable homotopy theory 来看，要问的却是一个谱映射的同伦类是否为零。Pontryagin–Thom construction 给出了这两个问题之间的联系。

**Theorem（Pontryagin–Thom）**　Framed bordism 由 sphere spectrum 表示。设 *X* 是 CW complex，*d* 是非负整数。考虑闭光滑 *d* 维流形，每个流形都带有 stable normal framing 和一个到 *X* 的连续映射。按保持这些数据的 bordism 取等价类，就得到相应的 framed bordism 群。用 Mfr 表示这种标架结构的 Thom spectrum，用 X₊ 表示给 *X* 加上一个不相交的基点得到的空间。下面第一行是谱等价，第二行是对 *X* 自然的群同构。

$$
\begin{aligned}
&M\mathrm{fr} \simeq \mathbb S = \Sigma^\infty S^0,\\
&\Omega_d^{\mathrm{fr}}(X) \xrightarrow[\cong]{\mathrm{PT}}
\pi_d(\Sigma^\infty X_+)
= [\Sigma^d\mathbb S,\Sigma^\infty X_+]_{\mathrm{Sp}} .
\end{aligned}
$$

方括号表示谱映射的同伦类。取 *X* 为一点，把流形 *M* 嵌入足够高维的欧氏空间，使给定的稳定标架由秩为 *r* 的法丛上的标架 φ 表示。把管状邻域外的部分压成一点，再用 φ 把各个法向圆盘与同一个标准圆盘对应起来，就得到第一行的 collapse map。第二行是相应的谱映射。

$$
\begin{aligned}
&c_\varphi\colon S^{d+r}
\longrightarrow \operatorname{Th}(\nu_M)
 \xrightarrow[\varphi]{\cong} M_+\wedge S^r
 \longrightarrow S^r,\\
&\Sigma^{-r}\Sigma^\infty c_\varphi
\colon \Sigma^d\mathbb S\longrightarrow\mathbb S .
\end{aligned}
$$

反过来，在足够高的维度，可以用光滑的球面间映射代表这个谱映射。取一个正则值，它的原像就是闭流形，目标球面在这一点的一组切向基经微分给出原像的法标架。对连接两个映射的同伦也作横截近似，同一个值的原像便给出两端流形之间的 framed bordism。流形的不交并对应谱映射的加法，一个闭流形能否成为与标架相容的边界，也就等价于对应的同伦类是否为零。（[Freed，第 10 讲](https://people.math.harvard.edu/~dafr/bordism.pdf)）

具体看三维空间里的一个标准圆环。以它围成的平面圆盘给出的 framing 为零，沿芯线给窄带多拧 *k* 个整圈，所得的 framed circle 记作 Kₖ。选定正向，使拧一个正向整圈得到的 collapse map 代表 Hopf map *h* 的同伦类。于是有下面的等式。

$$
\begin{aligned}
&\eta = [\Sigma^{-2}\Sigma^\infty h]
      \in [\Sigma\mathbb S,\mathbb S]_{\mathrm{Sp}}
       = \pi_1(\mathbb S)\cong\mathbb Z/2,\\
&\mathrm{PT}([K_k]) = k\eta,\qquad 2\eta=0 .
\end{aligned}
$$

沿标架把芯线推开一点，两条曲线的 linking number 就是这个映射的 Hopf invariant，在三维空间里还能分辨窄带朝哪个方向拧了几圈。稳定化以后，只留下圈数的奇偶。把谱里的等式 2η = 0 读回几何，就知道两个各拧一整圈的圆环取不交并，恰好可以成为一张紧曲面的全部边界，两边给定的标架也可以同时延伸为曲面上的稳定标架。（[Pontryagin 对圆环的计算](https://www.maths.ed.ac.uk/~v1ranick/papers/toplib.pdf#page=117)，[Hopf map 的 suspension](https://ocw.mit.edu/courses/18-906-algebraic-topology-ii-spring-2020/9c132d351322990b96fa38d1e2701edf_MIT18_906S20_ch4.pdf)）

Hilbert 谈数学各部分之间的联系，我所理解的就是这件事。我原先问的是一张曲面是否存在，给出答案的却是 stable homotopy theory 里的一个等式。理解了这个对应，我既可以从曲面读懂等式中的零，也知道了那张曲面为什么应当存在。定理虽是旧知，这层联系对第一次看清它的人来说，仍是新的。这也是数学最吸引我的地方。

对我而言，数学最宝贵的特质之一就是自由。我可以自己选择一个感兴趣的问题，也可以因为在半路上遇见了更好的问题而改变主意。AI 能替我排除一条走不通的路，或是指出一处凭我自己很难看出的联系，这些都使我多了一点自由。可是，倘若模型提出问题、给出证明，而我们往后把大部分精力都花在整理和验证它的产出上，那么即使每个人每天都在做数学，能够决定自己想做什么数学的人也可能越来越少。

没有人类理解的数学不是数学。

我这句话说的是数学作为一项人类事业的价值。一个命题可以在人们理解它以前就已经为真。可是，当我们说「我们理解了这个问题」，所指的应当是我们获得了某种过去没有的能力。原来看似偶然的联系，现在可以说明它为什么自然。原先只能逐行核对的证明，现在知道哪些假设可以放松，其中的思想还能用到什么地方。这份理解可以由许多人共同完成，只要我们还能够把各自相信的理由讲给彼此听。

以往一个长期悬而未决的问题终于得证，我们很自然地把它看作人类认识的进步。如今大语言模型（LLM）给出的证明，使数学原本可以一并追求的两个目标发生了分离。只要能够确认形式命题准确表达了我们所问的问题，推导也经得起核验，我们就有理由接受这个结论，并用它继续工作。至于人从中获得了什么洞见，一时未必有人说得分明。在这样的工作里，回答命题是否成立的数学，已经把帮助人理解它为何成立的数学远远甩在了后面。我们若仍按已经解决了多少个问题来衡量进步，那些最需要人继续思考的工作，恰好会被列入「已经完成」的那一栏。

数学界是否已经和现实脱离得太远？我觉得这是一个值得正面回答的问题。纯数学要用公共经费，仅凭我自己觉得美，当然说服不了所有人。但我也很怀疑，仅以数学家替社会解决了多少个问题来衡量这些经费的用处，究竟能说明多少。一个人学会把假设说清楚，学会追问一个听来很有道理的结论究竟依据什么，他日后即使忘了大半定理，这份判断力仍然是他的。一个愿意拿计算和预测来作公共决定的社会，也该愿意让承担后果的人懂得怎样质疑这些计算。

因此，即使有一天机器能够解决我们手头的全部问题，我也看不出，亲自思考这些问题就因此失去了意义。人的判断力是在作判断的过程中养成的。我们若只关心答案是否正确，当然有理由把越来越多的工作交给机器。可我们如果还珍惜独立思考的能力，就得为人保留亲自形成判断的机会。这是一个比数学的前途更根本的问题。

### 二、关于 AI

> 弱小和无知不是生存的障碍，傲慢才是。
>
> —— 刘慈欣，*三体*

讨论 AI 的创造力，也得承认人可能有自己的傲慢。发现前人未曾注意的联系，为已有的问题找到新的证明，这些原本都是我们承认的创造。等机器也能做到，我们又要求它连问题本身都须自行提出。一个标准，如果每逢机器达到它便要修改，最后能说明的恐怕只是我们多么在意保住人的优越地位。至于那个新的联系有没有价值，还得回到数学本身去判断。

一种常见的反对意见是，语言模型不过是按概率预测下一个词。但据此断定它所说的一切都没有新意，还欠一步论证。Turing 在回应 Lovelace 的异议时提到，我们很容易以为，知道一套规则，便已经知道了这些规则的一切后果。我能说清楚一个想法为什么有用，却未必说得清自己为什么偏偏在那一刻想到了它。如果将来有人解释了我的直觉是怎样形成的，我想，我也不会因为听懂了这个解释，就觉得自己当初的发现少了一分价值。（[Turing 对 Lovelace 异议的答复](https://www.cs.sfu.ca/~vaughan/teaching/889/papers/turing1950.html)）

我们素来把数学难题看作人类智慧的桂冠，也就该认真对待这套说法对于 AI 意味着什么。一个模型若能在全然陌生的问题里自行辨认什么是重要的，借用另一个领域的思想，又能发觉起初的想法错在何处，我会相信，它很可能已经具备了我们所谓的通用人工智能（AGI）。但读 Alpöge 的自述，仍然应当记得这是一项合作。是他先认出一个较简单的情形与原问题有什么关系，此后 Claude 推进论证的方式又远远超出了他的预期。这样的工作足以改变我对机器智能的估计。至于其中哪些判断已经可以交给模型独自完成，又能用到数学以外的什么地方，还值得分别去问。（[Alpöge 对这次合作的自述，第 1 页](https://alpo.ge/remark.pdf)）

即使我们有一天承认 AGI 已经出现，关于什么值得追求，人们仍然可能有正当的分歧。一个模型可以比我更准确地预见某个决定的后果，可是，哪些后果值得接受，尤其是谁应当承担这些后果，本来就是作决定的人需要说明的。拿机器的聪明来答复受影响的人的异议，等于把我们自己选择的标准也当成了一个已经证明的命题。

这篇文章的初稿由 AI 写成。四个标题和每段的主旨由我给出，我还请它模仿我的语气。几次修改下来，我发现自己尤其需要留意那些读起来最像我的句子。我很容易因为认得这副口吻，便以为自己也认真想过这个判断。可我若在文中批评一家公司的做法伤害了数学共同体，读者追问理由，我应当能够放下稿子，自己回答。答不上来，那句话就该删，哪怕它是整篇文章里最像我的一句。

### 三、关于黎曼猜想

> We mathematicians need to put far greater effort into communicating mathematical ideas. To accomplish this, we need to pay much more attention to communicating not just our definitions, theorems, and proofs, but also our ways of thinking. We need to appreciate the value of different ways of thinking about the same mathematical structure.
>
> —— William P. Thurston, *On Proof and Progress in Mathematics*

我应当声明，我的专业领域并非数论，也无意在这篇非学术性的文章里评判黎曼猜想的这个证明。我想谈的是，这次发布究竟给读者带来了什么。Alpöge 说，他试过让 Claude 把论证展开成文字，生成的稿子超过二十五万页。每天读二十页，一天不休，读完一遍也要三十四年有余，还没有给读者留下回头核对和思考的时间。他自己也认为这份稿子没法读，因此当天公开的是四页说明和相应的 Lean 代码。Andrew Sutherland 同日公布了独立核验的记录，十七万五千多个模块全部编译通过，五个主要定理只用了 Lean 的三个标准公理。这些都是认真对待这项结果的理由。（[Alpöge 的说明，尤其是第 2 页](https://alpo.ge/remark.pdf)，[Sutherland 的核验记录](https://math.mit.edu/~drew/grh/)）

我仍然认为，对于黎曼猜想这样一个困扰数学家一百多年的问题，仅凭一套同行几乎无法通读的代码和几页梗概，就向公众宣布已经找到了证明，是一种极其不负责任的发布方式。我尊重 Alpöge 的坦白。他承认自己还有许多地方没有读懂，也愿意在未来把证明写清楚。我的批评指向的是，在这个承诺兑现以前，公众有多大理由把这件事理解为人类已经弄懂了黎曼猜想。代码使旁人有机会复核推导，而一个同行若想知道整个论证靠什么成立、其中哪些想法还值得往别处用，眼下仍得自己做一项相当艰难的研究。把这些理由解释清楚，首先是发布者的责任。

我想到的是 Faltings。1989 年，他以极深的技术手段证明了 Fontaine 在 p-adic Hodge theory 中的一个比较猜想。粗略地说，用两种不同的办法研究同一个几何对象，适当转换以后，两边所得的结果应当吻合。二十多年后，Beilinson 又给出了一个新证明。Scholze 则沿着 Faltings 的思路，借 perfectoid spaces 重新理解其中的局部几何，进而把比较定理推广到了更广的一类空间。后来的工作之所以重要，正在于人们从中认出了一个在别处也能起作用的结构。一个 *morally correct* 的证明哪有那么容易？最初的证明已经成立，等到有人看清它为什么自然，又花去了一代人的工夫。（[Nizioł 的历史回顾](https://webusers.imj-prg.fr/~wieslawa.niziol/final-version-open.pdf)，[Beilinson 的新证](https://arxiv.org/abs/1102.1294)，[Scholze 的论文](https://www.math.uni-bonn.de/people/scholze/pAdicHodgeTheory.pdf)）

所以回到今天的问题。即使这份证明完全正确，在人们真正理解它以前，黎曼猜想就仍然值得研究。一个数学家肯花几年读懂代码，从中提炼出旁人也能理解、能继续使用的思想，这项工作理应算在他名下。另一个数学家也完全可以一行代码都不读，沿着自己的思路，另求一证。一项结果值得全体数学家认真对待，同每一位数学家都有义务为它花上几年时间，中间还有相当大的距离。发表了这份证明，作者也无权征用同行的时间。

网上有些人读到 AI 可能证明了黎曼猜想，首先关心的竟是研究数论的人今后还能否以此为业。数学家表示赞同，他们便引用他的声望，数学家有所保留，他们又把异议解释为对自身地位的忧虑。一个读者当然有资格质疑专家。可我很难理解，一项自己未曾参与、也无意弄懂的工作，何以忽然赋予了他裁断别人生涯的自信。其间他为这项工作作出的全部贡献，是转发了一条消息。

### 四、关于未来

今后的数学研究，人和 AI 一起工作，大概会像今天人们借助计算机做数值实验一样平常。有些数学也许会因此离实验更近，我很期待。可近来谈论这些变化的人，似乎还默认了一个前提，离技术风口越近，个人价值就越高，进场越早，对未来的贡献就越大。《模型一代》里有学生批评清华的计算机课程要求严而指导少，甚至说应该把清华的教授「全开除」。课程教得如何，自然值得认真谈。一个行业凭一时之盛，就有资格裁定别人的工作还有没有价值吗？拿热钱的去向给一代人排座次，这套逻辑同旧时酒席上听说某人「在相府当差」便请他上座，倒没有多大分别。（[《模型一代》](https://feng.ifeng.com/c/8yB47dbReJo)）

每一次大的技术变革，都会给身处其中的人一种强烈的「时代中心感」。造发电机、铺电网的工程师当然伟大。可一个今天借电子仪器作出医学发现的科学家，难道就比当年设计发电机的人更远离时代的中心吗？一种通用工具的价值，有很大一部分得由后来使用它的人才能实现，连它的发明者也未必想象得到。一个今天还在安安静静做基础数学、研究凝聚态物理或者生命科学的年轻人，能不能做出改变人们认识的工作，我以为不必等下一轮融资来替他回答。

坦率地说，数学今后还能否保有今天的声望，我个人并不十分在意。我更担心的是，一个人今后还能在多大程度上凭自己的才智改变处境。我很想相信，AI 使长期以来只有少数人能够接受的数学教育向更多人开放。一个身边没有老师的学生，今天也能用自己熟悉的语言反复追问一个定义，这是切实的进步。可是，读到一份公开的证明，和能够使用产生这份证明的内部模型，给人的机会相差很远。对于一个尚未做出成果的研究者，能否把自己的问题交给同一个模型去检验，往往更为要紧。

获得知识的机会从来就不平等。谁能遇到好老师，谁有几年可以安心读书，本来就会影响一个人能够走多远。内部模型令我担忧的地方，在于它还会改变我们习惯归功于个人才智的那些能力。两个原本有着相近判断力的人，一个能够反复检验自己的猜想，另一个连初次尝试的代价都难以承担。几年之后，前者也许确实更善于判断一个想法值不值得继续。最初分配的是使用工具的机会，后来评定的却已经是人的能力。

到这一步，即使评审对每个人都很公正，也可能使原有的差距进一步扩大。获得职位的人凭已经表现出来的能力，取得使用下一代模型的资格。落选的人日后或许也能用上同样的工具。只是本可用来磨炼判断力的那几年，已无从追回。倘若越来越多的智力劳动都有这样的门槛，一个年轻人就得先得到少数机构的认可，才有机会形成那些机构要求他事先证明的能力。阶层固化最难辨认的地方，恐怕正在于此。每次选拔都可以有充分的理由，而有些人甚至无从证明自己也值得被选中。

今年 10 月 6 日，OpenAI 一次发布了内部模型生成的七百二十二篇数学手稿，其中一部分附有 Lean 形式化证明。同月，公司宣布出资五百万美元支持后续研究。到了 11 月，一批数学家发起 MathHelm，讨论哪些论证可靠，哪些想法确有新意，又有哪些前人的贡献被忽略。我尊重肯逐篇审读这些工作的同行。这种发布方式本身却使我有所怀疑。数学界要判断这批成果究竟有多大价值，需要相当长的时间。对一家 AI 公司而言，公众一旦相信它的模型已经能够攻克人类最困难的智力问题，数学的声望也就已经为它关于通用智能的主张作了证。后一件事发生得比前一件事早得多。这正是我怀疑其中也有政治目的的缘故。（[OpenAI 的公告](https://openai.com/index/sharing-ai-progress-in-mathematics/)，[MathHelm 发起人的说明](https://terrytao.wordpress.com/2026/11/13/introducing-mathhelm-a-place-to-discuss-ai-generated-papers/)）

在我看来，这种做法损害了学术共同体独立判断的权利。研究者本应有时间弄清一个结果意味着什么，也应当能够认为，另一个问题更值得自己的注意。可当一家公司的发布已经被公众当作数学突破，持有异议的人便须额外解释，为什么自己还不能承认这个评价。即使参与其中的人都真诚地关心数学，这个先后次序仍然改变了谁有权说什么算作进步。如果学术界接下来研究什么，越来越取决于少数公司选择发布什么，那么 AI 所扩展的，究竟是谁选择问题的自由？

我最后想起的，还是开头的两个圆环。即使已经知道 2η = 0，我也想亲手画出那张曲面，看清楚两个朝同一方向拧了一圈的标架怎样一起延伸到里面去。为这个早已有了答案的问题花掉一个下午，我是愿意的。我担心的是，以后一个靠数学谋生的年轻人，还花不花得起这个下午。

2026年11月22日凌晨<br>
于UIUC校园<br>
Derek

</div>

---

<div lang="en" markdown="1">

## On the Recent Development of AI in Mathematics {#english}

> It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way.
>
> — Charles Dickens, *A Tale of Two Cities*

On November 20, 2026, a little over two months after the bicentenary of Riemann’s birth, the Anthropic mathematician Levent Alpöge published a four-page note in which he said that he and Claude had found a proof of the Riemann hypothesis. He also released the Lean code. I have no wish to tell the mathematical community how to find its place in all this, and no particular standing to do so. I write for people who care about mathematics as I do. The question I’ve been trying to answer for myself is how I want to spend my time in mathematics now that tools like Claude are part of it. ([Alpöge’s note](https://alpo.ge/remark.pdf), [Riemann’s biography](https://mathshistory.st-andrews.ac.uk/Biographies/Riemann/))

Much of the recent talk about mathematics calls to mind those people in Dickens who would speak of their own times only in superlatives. What stayed with me was a personal detail in Alpöge’s note. As a student, he had imagined spending decades on the Riemann hypothesis. The prospect had shaped his choice of books and the mathematics he had set out to learn. Now he believes he has found a proof. In writing about it, he also describes a sense of loss.

### I. On Mathematics

> To my mind mathematics is an indivisible whole, an organism whose life depends on the connections among its parts. For all the variety of its subject matter, we can see quite clearly that the same tools of logic recur throughout mathematics, that its ideas are akin, and that analogies abound among its different branches. We also see that the further a mathematical theory develops, the more harmonious and unified its structure becomes, and the more it reveals unsuspected connections between fields once thought separate. As mathematics grows, its unity becomes all the more apparent.
>
> — David Hilbert, *Mathematical Problems*

When I say I like mathematics, how much of what I like is being known as someone who is good at it? In my case, I suspect both pleasures are real. I’m pleased when I work something out for myself, and a little more pleased if I get there before the people around me. From exams and competitions to the publication of papers, we offer very real rewards for getting there first. We grow used to thinking we deserve them. So if a model finds a proof before I do, I owe myself an honest question. What exactly am I sorry to lose? The time I might have spent with the problem, or the way other people used to see me?

There are parts of mathematics I still like to think about long after I know the answer. Take a closed curve with a chosen stable framing. Can I find a compact surface whose entire boundary is that curve, with a stable framing that extends the one I started with? In geometric terms, I am looking for a surface. In stable homotopy theory, I can ask whether a certain map of spectra is nullhomotopic. The Pontryagin–Thom construction lets me pass from one question to the other.

**Theorem (Pontryagin–Thom).** The sphere spectrum represents framed bordism. Let *X* be a CW complex and *d* a nonnegative integer. Consider closed smooth *d*-manifolds equipped with a stable normal framing and a continuous map to *X*. Taking bordism classes with respect to these data gives the framed bordism group of *X* in degree *d*. Write Mfr for the Thom spectrum of the framing structure and X₊ for *X* with a disjoint basepoint. The first line below is an equivalence of spectra. The second is a group isomorphism natural in *X*.

$$
\begin{aligned}
&M\mathrm{fr} \simeq \mathbb S = \Sigma^\infty S^0,\\
&\Omega_d^{\mathrm{fr}}(X) \xrightarrow[\cong]{\mathrm{PT}}
\pi_d(\Sigma^\infty X_+)
= [\Sigma^d\mathbb S,\Sigma^\infty X_+]_{\mathrm{Sp}} .
\end{aligned}
$$

The brackets denote homotopy classes of maps of spectra. Take *X* to be a point. Embed *M* in Euclidean space of sufficiently high dimension that a framing φ of its rank-*r* normal bundle represents the given stable framing. Collapse the complement of a tubular neighborhood to a point. The framing identifies each normal disk with the same standard disk, so we can forget the point of *M* over which the disk lies. This gives the map in the first line below. The second line gives the corresponding map of spectra.

$$
\begin{aligned}
&c_\varphi\colon S^{d+r}
\longrightarrow \operatorname{Th}(\nu_M)
 \xrightarrow[\varphi]{\cong} M_+\wedge S^r
 \longrightarrow S^r,\\
&\Sigma^{-r}\Sigma^\infty c_\varphi
\colon \Sigma^d\mathbb S\longrightarrow\mathbb S .
\end{aligned}
$$

Conversely, in sufficiently high dimension we can represent this map of spectra by a smooth map between spheres. The inverse image of a regular value is a closed manifold. A basis of the tangent space at that value gives a framing of the normal bundle of the inverse image via the derivative. Given a homotopy between two such maps, we can make the homotopy transverse to the chosen value as well. Its inverse image is then a framed bordism between the two manifolds. Disjoint union corresponds to addition of maps of spectra. A closed framed manifold therefore bounds a compact manifold with a compatible framing precisely when the corresponding homotopy class is zero. ([Freed, Lecture 10](https://people.math.harvard.edu/~dafr/bordism.pdf))

For a concrete case, take a round circle in three-dimensional space. Use the planar disk it bounds to fix the zero framing, and picture the framing as a narrow ribbon running along the circle. Give the ribbon *k* additional full twists and call the resulting framed circle Kₖ. Choose the sign so that one positive full twist gives a collapse map in the homotopy class of the Hopf map *h*. With that convention, we get the identities below.

$$
\begin{aligned}
&\eta = [\Sigma^{-2}\Sigma^\infty h]
      \in [\Sigma\mathbb S,\mathbb S]_{\mathrm{Sp}}
       = \pi_1(\mathbb S)\cong\mathbb Z/2,\\
&\mathrm{PT}([K_k]) = k\eta,\qquad 2\eta=0 .
\end{aligned}
$$

Push the circle slightly off itself along the framing. Its linking number with the displaced copy is the Hopf invariant of the collapse map. In three dimensions this integer tells us how many twists we gave the ribbon and in which direction. After stabilization, only the parity survives. Now read the equation 2η = 0 back into geometry. Two circles, each with one full twist, together form the entire boundary of a compact surface, and a single stable framing on that surface extends the given framings on both circles. ([Pontryagin’s calculation for the circle](https://www.maths.ed.ac.uk/~v1ranick/papers/toplib.pdf#page=117), [The suspension of the Hopf map](https://ocw.mit.edu/courses/18-906-algebraic-topology-ii-spring-2020/9c132d351322990b96fa38d1e2701edf_MIT18_906S20_ch4.pdf))

This is what I take Hilbert to mean by the connections between parts of mathematics. I wanted to know whether a surface existed. An equation in stable homotopy theory gave me the answer. The surface tells me what the zero in that equation means, and the equation tells me why there ought to be such a surface in the first place. The theorem is old. The connection is still new to someone seeing it for the first time. That is a large part of what draws me to mathematics.

One of the things I value most in mathematics is the freedom it gives me. I can choose a problem because it interests me, and I can change my mind if I come across a better one along the way. When AI helps me rule out an approach that goes nowhere, or points out a connection I would have been unlikely to see on my own, I have a little more of that freedom. But suppose the model comes up with the questions and the proofs, and we spend most of our time putting its work in order and checking it. We might all be doing mathematics every day, while fewer and fewer of us get to decide what mathematics we want to do.

Mathematics without human understanding is not mathematics.

I mean that as a claim about what makes mathematics worth doing as a human undertaking. A proposition can be true long before anyone understands it. But when we say we understand a problem, we ought to be able to do something we couldn’t do before. We can explain why a connection that looked accidental should have been expected. With a proof we could once only check line by line, we can now say which hypotheses might be weakened and where else the ideas might work. That understanding can be spread across many people, so long as we can still explain to one another why we believe what we do.

When a long-standing problem finally yielded to proof, it was natural to think that human understanding had advanced. With proofs produced by large language models (LLMs), two aims that mathematics could once pursue together have come apart. If the formal statement captures the question we meant to ask and the deductions check out, we have good reason to accept the result and build on it. What any of us has learned from it may be much harder to say. In work of this kind, our ability to settle whether a claim is true has far outstripped our ability to say why. If we go on measuring progress by the number of problems solved, some of the work that most needs human thought will already be marked “done.”

Has mathematics drifted too far from the rest of the world? I think the question deserves a straight answer. Pure mathematics costs public money, and my finding it beautiful will hardly persuade everyone. I doubt we learn much about how well that money is spent, though, from a count of the problems mathematicians have solved for society. Someone who learns to spell out an assumption and to ask what grounds there are for a plausible conclusion may later forget most of the theorems. The judgment they acquired is still theirs. A society willing to base public decisions on calculations and predictions ought also to give the people who live with those decisions a chance to learn how to question the calculations.

Even if machines could one day solve every problem before us, I see no reason to think it would then be pointless to work on those problems ourselves. We learn to exercise judgment by making judgments. If all we care about is getting the right answer, we have good reason to turn more and more of the work over to machines. If we also care about the ability to think for ourselves, people must have occasions to form a judgment of their own. There is more at stake here than the future of mathematics.

### II. On AI

> Weakness and ignorance are no bar to survival. Arrogance is.
>
> — Liu Cixin, *The Three-Body Trilogy*

There is room for a little humility on our side when we talk about what AI can create. We have always counted it as creative work to notice a connection no one had seen or to find a new proof of a known result. Once a machine can do that, we ask whether it could have come up with the question, too. If we revise the standard every time a machine meets it, we may learn very little except how much we care about coming out on top. To judge whether a new connection matters, we still have to look at the mathematics.

A familiar objection is that a language model merely predicts the next word on the basis of probabilities. It takes a further argument to show that nothing it says can be original. Turing, in his reply to Lady Lovelace’s objection, remarked on how easily we assume that knowing a set of rules means knowing everything that follows from them. I can explain why an idea works without being able to say why it occurred to me at that particular moment. If someone explained to me tomorrow how my intuition works, I doubt I would think any less of the discovery for knowing how I came by it. ([Turing on Lady Lovelace’s objection](https://www.cs.sfu.ca/~vaughan/teaching/889/papers/turing1950.html))

We have long regarded the solution of a great mathematical problem as a crowning achievement of human intelligence. We ought to take seriously what that view implies for AI. Suppose a model could size up a wholly unfamiliar problem, see what mattered, borrow an idea from another field, and recognize where its first attempt had gone wrong. I would think it quite likely that the model already possessed what we call artificial general intelligence (AGI). What Alpöge describes, though, was a collaboration. He was the one who saw how a simpler case bore on the original problem. Claude then took the argument much further than he had expected. That is enough to change my estimate of what a machine can do. I would still like to know which of those judgments the model could have made on its own, and whether it could exercise the same judgment outside mathematics. ([Alpöge’s account of the collaboration, p. 1](https://alpo.ge/remark.pdf))

Even if we agree one day that AGI has arrived, we will still have legitimate disagreements about what is worth pursuing. A model may foresee the consequences of a decision more accurately than I can. The people making the decision still owe us an account of which consequences they are prepared to accept and, especially, whom they expect to bear them. When someone who has to live with a decision objects to it, telling them how clever the machine is amounts to treating a standard we chose as though it were a theorem we had proved.

AI wrote the first draft of this essay. I supplied the four headings and the point I wanted each paragraph to make. I also asked it to imitate my voice. After a few rounds of revision, I found I had to read most carefully the sentences that sounded most like me. It’s easy to recognize my own tone and assume I must have thought the matter through. If I say here that a company has done harm to the mathematical community, and a reader asks me why, I ought to be able to set the draft aside and answer for myself. If I can’t, the sentence should go, even if nothing else in the essay sounds quite so much like me.

### III. On the Riemann Hypothesis

> We mathematicians need to put far greater effort into communicating mathematical ideas. To accomplish this, we need to pay much more attention to communicating not just our definitions, theorems, and proofs, but also our ways of thinking. We need to appreciate the value of different ways of thinking about the same mathematical structure.
>
> — William P. Thurston, *On Proof and Progress in Mathematics*

I am not a number theorist, and I have no intention of passing judgment on this proposed proof of the Riemann hypothesis in an essay for a general audience. What interests me is what a reader actually had in hand on the day of the announcement. Alpöge says he asked Claude to write the argument out in prose. The result ran to more than 250,000 pages. At twenty pages a day, without a day off, a single reading would take over thirty-four years. That allows no time to go back, check a detail, or think. Alpöge himself considered the manuscript unreadable, so what he released that day was a four-page note and the accompanying Lean code. Andrew Sutherland published an independent verification the same day. More than 175,000 modules compiled successfully, and the five main theorems depended only on Lean’s three standard axioms. Those are good reasons to take the result seriously. ([Alpöge’s note, especially p. 2](https://alpo.ge/remark.pdf), [Sutherland’s verification](https://math.mit.edu/~drew/grh/))

I still think it deeply irresponsible to announce to the public that you have proved a conjecture that has occupied mathematicians for well over a century, when all you can offer readers is a few pages of outline and a body of code your colleagues can scarcely hope to read through. I respect Alpöge’s candor. He acknowledges that there is much he has yet to understand, and he intends to write a clear account. Until he does, what grounds does the public have for believing that we now understand the Riemann hypothesis? The code gives others a way to check the deductions. A mathematician who wants to know what makes the argument work, or which of its ideas might be of use elsewhere, still has a difficult piece of research ahead of them. The first responsibility for explaining those things lies with the people who announced the proof.

I think of Faltings. In 1989, in an extraordinary feat of technique, he proved one of Fontaine’s comparison conjectures in *p*-adic Hodge theory. Roughly speaking, the conjecture said that two ways of studying the same geometric object should, after a suitable translation, give answers that agree. More than twenty years later, Beilinson gave a new proof. Scholze followed Faltings’s approach, using perfectoid spaces to understand the local geometry and extend the comparison theorem to a wider class of spaces. What mattered about the later work was that people could now recognize a structure they could put to use elsewhere. Who ever said a *morally correct* proof was easy to come by? The original proof was already there. It took another generation to see what made it natural. ([Nizioł’s historical account](https://webusers.imj-prg.fr/~wieslawa.niziol/final-version-open.pdf), [Beilinson’s proof](https://arxiv.org/abs/1102.1294), [Scholze’s paper](https://www.math.uni-bonn.de/people/scholze/pAdicHodgeTheory.pdf))

So where does that leave the Riemann hypothesis? Even if the proof is entirely correct, the problem will remain worth studying for as long as we have yet to understand it. A mathematician who spends years reading the code and draws from it ideas that others can understand and use deserves credit for that work. Another mathematician has every right to leave the code unread and look for a proof of their own. It is one thing to say that the whole profession should take a result seriously, and quite another to say that each of its members owes it several years of their life. Publishing a proof gives no one a claim on a colleague’s time.

Some people online heard that AI might have proved the Riemann hypothesis and immediately wanted to know whether number theorists would still have jobs. When a mathematician endorsed the result, they were happy to invoke that person’s authority. When a mathematician expressed reservations, they dismissed those doubts as a mathematician’s fear of losing status. Any reader is entitled to question an expert. What I find harder to understand is how work that someone took no part in, and has no interest in understanding, can suddenly give them the confidence to pass judgment on somebody else’s career. Their own contribution to the work was to share a post.

### IV. On the Future

I expect that working with AI will eventually feel as ordinary to mathematicians as running a numerical experiment on a computer does today. Some parts of mathematics may become more experimental as a result. I look forward to that. But I keep hearing an assumption in recent discussions. The closer you are to the industry of the moment, the more you matter. The earlier you get in, the more you will have contributed to the future. In *The Model Generation*, students complained that Tsinghua’s computer science courses demanded a great deal and offered little guidance. There was even a call to “fire all the professors” at Tsinghua. How well those courses are taught deserves a serious discussion. But what gives an industry, in its hour of prosperity, the right to decide whose work is still worth doing? Ranking a generation by where the money is going seems little different from the old custom of offering a man the seat of honor at dinner on learning that he worked in the chancellor’s household. ([The Model Generation](https://feng.ifeng.com/c/8yB47dbReJo))

Every great technological change gives the people closest to it the feeling that history is happening right where they stand. The engineers who built generators and laid the power lines did extraordinary work. Is a scientist who makes a medical discovery with electronic instruments today any further from the center of things than the engineer who designed the generator? Much of the value of a general-purpose tool emerges only in the hands of people who come later. Its inventors may never have imagined what those people would do with it. Somewhere today a young person is quietly working on pure mathematics, condensed matter physics, or the life sciences. I see no reason to wait for the next round of funding to tell us whether that work might change how we understand the world.

Frankly, I don’t much care whether mathematics keeps the prestige it enjoys today. What worries me more is whether people will still be able to change their circumstances by their own abilities. I would like to believe that AI is opening up a mathematical education long available only to a few. A student with no teacher nearby can now ask about a definition in their own language and keep asking until it makes sense. That is real progress. Even so, being able to read a published proof is a long way from having access to the in-house model that produced it. For a researcher who has yet to produce a result, what matters more may be whether they can try out a question of their own on that same model.

Access to knowledge has never been equal. How far you get has always depended in part on whether you meet a good teacher or have a few years in which you can afford to study undisturbed. What troubles me about in-house models is that access to them can shape the very abilities we tend to credit to individual talent. Consider two people who start out with much the same judgment. One can test conjecture after conjecture. The other can barely afford a first attempt. A few years on, the first may genuinely have better instincts about which ideas are worth pursuing. At the outset, the difference lay in who got to use a tool. By the time anyone comes to assess them, the difference is one of ability.

By then, even a committee that treats both candidates fairly can widen the gap between them. The candidate who gets the job has shown enough ability to earn access to the next model. The one who loses out might eventually get to use it too. What they cannot get back are the years they might have spent developing their judgment. If more kinds of intellectual work come to have a barrier of this sort, a young person will need the approval of a handful of institutions just to develop the abilities those institutions already expect them to demonstrate. This may be why it is so hard to see a class system hardening in front of us. A committee can give good reasons for every choice it makes, while some people never get a chance to show what they can do.

On October 6 of this year, OpenAI released 722 mathematical manuscripts at once, all generated by an in-house model. Some came with formal proofs in Lean. Later that month the company announced five million dollars in funding for follow-up research. In November, a group of mathematicians launched MathHelm to discuss which arguments held up, which ideas were genuinely new, and whose earlier contributions had been overlooked. I respect the people willing to read those manuscripts one by one. I have my doubts about the decision to release them all at once. It will take mathematicians a long time to judge what this body of work is worth. An AI company works to a different timetable. Once the public believes its model can solve some of the hardest problems the human mind has faced, the prestige of mathematics is already lending weight to the company’s claims about general intelligence. That happens long before mathematicians have had time to reach a judgment. It is this difference in timing that makes me suspect the release also served a political purpose. ([OpenAI’s announcement](https://openai.com/index/sharing-ai-progress-in-mathematics/), [The introduction to MathHelm](https://terrytao.wordpress.com/2026/11/13/introducing-mathhelm-a-place-to-discuss-ai-generated-papers/))

In my view, this undermines the right of a scholarly community to exercise its own judgment. Researchers ought to have time to understand what a result means. They ought to be free to decide that another problem deserves more of their attention. Once the public has accepted a company announcement as a mathematical breakthrough, anyone who reserves judgment has the additional task of explaining their hesitation. Everyone involved might sincerely care about mathematics, and the order in which these things happen would still affect who gets to say what counts as progress. If the questions researchers pursue come to depend more and more on what a few companies choose to release, whose freedom to choose a problem has AI enlarged?

I keep coming back to those two circles. I know that 2η = 0, and I would still like to draw the surface myself and see how the two framings, each given a full twist in the same direction, extend together over it. I would gladly spend an afternoon on that, knowing the answer in advance. What worries me is whether a young person trying to make a living in mathematics will still be able to afford that afternoon.

Early morning, November 22, 2026<br>
On the UIUC campus<br>
Derek

</div>
