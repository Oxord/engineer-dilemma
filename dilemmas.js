const DILEMMAS = [
    {
        id: 'engineer-security',
        kicker: 'Fintech · Security',
        title: "The Engineer's Dilemma",
        description: 'The night before launch. You discover a critical vulnerability in the code you built with your team over six months of grueling work.',
        tags: ['security', 'release', 'loyalty'],
        estimatedMinutes: 6,
        approxSteps: 4,
        start: 'start',
        story: {
            start: {
                text: "You're a senior developer at fintech startup TechCorp. Tonight, twelve hours before the year's biggest release, you accidentally discover that the app is writing user passwords in plain text to the production server logs.\n\nThe team has been working at full burn for six months. The release is critical for the funding round. Your annual bonus is tied to launch.",
                choices: [
                    { text: "Message the CTO immediately", next: "r1" },
                    { text: "Double-check first — maybe I'm misreading this", next: "b1" }
                ]
            },
            b1: {
                text: "An hour of analysis at 3 AM: it all checks out. The logs have been writing passwords in plain text since the start of beta. Thousands of records.\n\nYou're tired and angry. The third coffee is going cold on your desk.",
                choices: [
                    { text: "Wake the CTO anyway — this is serious", next: "r1" },
                    { text: "Try to patch it quietly before morning", next: "b2_silent" }
                ]
            },
            r1: {
                text: "The CTO responds in ten minutes and calls an emergency meeting. After a brief discussion she trusts your judgment: \"You're closest to the code. What should we do?\"\n\nThe clock on the wall reads 4:17.",
                choices: [
                    { text: "Delay the launch by a week and do it right", next: "r2_delay" },
                    { text: "Push an urgent patch and disclose publicly", next: "r2_hotfix" }
                ]
            },
            r2_delay: {
                text: "The CTO agrees. The release is pushed back two weeks. One investor finds out and cuts the company's valuation by 30%.\n\nThe CEO calls you \"the paranoid one who cost us money\" in hallway conversations. Part of the team goes cold when you walk into the open space. A recruiter from a competitor reaches out.",
                choices: [
                    { text: "Stay and prove yourself through the work", next: "r3_stay" },
                    { text: "Take the competitor's offer", next: "r3_leave" }
                ]
            },
            r2_hotfix: {
                text: "You ship the urgent patch four hours before launch. The CTO publishes a security advisory on the company site the day of release. TechCrunch writes: \"TechCorp sets a new standard for transparency.\"\n\nA week later the VP of Engineering tells the all-hands how \"he personally led the rapid response.\" Not a word about you.",
                choices: [
                    { text: "Talk to the VP directly and demand acknowledgment", next: "r3_confront" },
                    { text: "Stay quiet — results matter more than credit", next: "r3_silent" }
                ]
            },
            b2_silent: {
                text: "You open your editor and start writing the patch. At 3:30 your colleague Sarah walks in — she forgot her charger.\n\n\"Oh, still here? What are you fixing?\" she asks, peering over your shoulder.",
                choices: [
                    { text: "Tell her everything", next: "b3_truth" },
                    { text: "Lie: \"Just optimizing logging\"", next: "b3_lie" }
                ]
            },
            b3_truth: {
                text: "Sarah turns pale. \"This needs to be escalated right now,\" she says.\n\nYou remind her: waking the CTO at 3:30 will torpedo the release, and fifty people will miss their bonuses.",
                choices: [
                    { text: "Agree, and wake the CTO together", next: "r1" },
                    { text: "Convince her to stay silent and fix it together", next: "b4_silent" }
                ]
            },
            b3_lie: {
                text: "Sarah nods and leaves. You finish the patch and merge it into main at 5 AM. The release goes flawlessly. Your full bonus comes through.\n\nThree weeks later, a screenshot of the old logs with passwords surfaces on a public security forum. A journalist messages you on LinkedIn.",
                choices: [
                    { text: "Admit it: \"Yes, we knew, we fixed it quietly\"", next: "ending_compromised" },
                    { text: "Deny it: \"First I'm hearing of this\"", next: "ending_coverup" }
                ]
            },
            b4_silent: {
                text: "You fix it together. The release succeeds. Sarah noticeably avoids you in the office for weeks after.\n\nA year later the company gets breached — through a different vector, but the post-mortem surfaces your old branch with the quiet patch in the commit history. HR starts having \"conversations.\"",
                choices: [
                    { text: "Come forward and take responsibility", next: "ending_compromised" },
                    { text: "Stay silent — let them prove it", next: "ending_coverup" }
                ]
            },
            r3_stay: {
                text: "Six months later a junior engineer named Anton comes to you. He just found leaked API keys in a partner integration's code.\n\n\"I've got a date tonight — can it wait till Monday? Doesn't seem that bad.\"",
                choices: [
                    { text: "Tell him about that night and insist on escalating now", next: "ending_professional" },
                    { text: "Give safe advice: \"File a ticket, we'll handle it Monday\"", next: "ending_compromised" }
                ]
            },
            r3_leave: {
                text: "First week at the new company, you spot a similar risk in the payments architecture: keys are being logged in debug mode. Nobody has noticed yet.\n\nThey don't know you here. Zero credit of trust.",
                choices: [
                    { text: "Raise it at standup, citing policy", next: "ending_professional" },
                    { text: "Wait a couple of months until you've earned trust", next: "ending_compromised" }
                ]
            },
            r3_confront: {
                text: "The VP denies it at first, then his expression shifts: \"You're right. I screwed up. I'll set the record straight at the next all-hands.\"\n\nA month later you're promoted to Principal Engineer and asked to lead the security program.",
                choices: [
                    { text: "Use the role to rewrite the culture's processes", next: "ending_professional" },
                    { text: "Focus on the promotion, don't rock the boat", next: "ending_compromised" }
                ]
            },
            r3_silent: {
                text: "Six months pass. At your annual review you're passed over for promotion — \"still need to show more strategic impact.\" The VP signed the review himself.\n\nA junior asks at lunch: \"Is it true you wrote that urgent patch?\"",
                choices: [
                    { text: "Tell the truth — let the industry know", next: "ending_professional" },
                    { text: "Leave quietly, no loud explanations", next: "ending_compromised" }
                ]
            },

            ending_professional: {
                text: "A year later you're invited to keynote an industry conference: \"Security as a Habit.\" The talk reaches 200,000 views.\n\nThree engineers message you on LinkedIn — they heard the story about that night and made their own right decisions because of it."
            },
            ending_compromised: {
                text: "Your career continues, but the residue stays. Years later you notice you listen to other people's ethical-dilemma stories with particular attention — you recognize the patterns.\n\nIt makes you more careful. And maybe wiser. But not louder."
            },
            ending_coverup: {
                text: "Four months later an independent researcher publishes a full technical report with links to the commit history.\n\nYou're fired with the formal reason \"breach of professional ethics.\" A regulator opens an investigation. Several companies rescind their offers. Your LinkedIn profile bleeds connections."
            }
        },
        endings: {
            ending_professional: {
                title: "The Professional",
                verdict: "You walked the path and broke nothing important along the way. Ethics became not a burden but a foundation — and an experience you later passed on."
            },
            ending_compromised: {
                title: "The Wounded Professional",
                verdict: "Not perfect, but honest. Ethics isn't about a clean result — it's about what you do with your compromises after."
            },
            ending_coverup: {
                title: "The Cover-Up Exposed",
                verdict: "Silence after a mistake becomes its own ethical debt. It almost always returns with interest."
            }
        }
    },

    {
        id: 'designer-dark-pattern',
        kicker: 'Product · Dark Patterns',
        title: "The Designer's Dilemma",
        description: "The manager asks you to make unsubscribing \"accidentally\" harder. The data says: people will leave 8% less often. Your bonus too.",
        tags: ['UX', 'product ethics', 'compromise'],
        estimatedMinutes: 5,
        approxSteps: 4,
        start: 'start',
        story: {
            start: {
                text: "You're a product designer at a subscription service. A message arrives in the team chat from the product manager: \"Hey, we need to cut churn by 8%. We're making unsubscribe three screens with email confirmation. The CEO approved.\"\n\nYou know this is a classic dark pattern — an interface deliberately complicated so the user can't easily back out of the service. But the numbers really will move, and your quarterly bonus is tied to retention.",
                choices: [
                    { text: "Refuse: \"I won't design this\"", next: "refuse" },
                    { text: "Agree, but softer: one screen and an email", next: "comply" }
                ]
            },
            refuse: {
                text: "The PM replies, annoyed: \"Fine, I'll hand it to Denis from the next team.\"\n\nA week later the feature ships — three screens, worse than planned. At sprint review the PM says in front of everyone: \"Good thing this team has people who deliver, not just ideologues.\"",
                choices: [
                    { text: "Help Denis soften what's already shipped", next: "refuse_help" },
                    { text: "Escalate to the Head of Design", next: "refuse_escalate" }
                ]
            },
            comply: {
                text: "The PM agrees to your compromise. Two weeks later — in production. Retention really does grow by 6%.\n\nA month later you overhear support: \"That's the twentieth ticket from an elderly woman who's been trying to unsubscribe for a month.\" The App Store rating drops from 4.5 to 4.1.",
                choices: [
                    { text: "Raise it at sprint review and propose a revert", next: "comply_revert" },
                    { text: "Stay silent — the task is closed, metrics are up", next: "comply_silent" }
                ]
            },
            refuse_help: {
                text: "Denis accepts the help. Together you rebuild the flow to a single screen. The PM grumbles but doesn't block — the rating has been falling anyway.\n\nDenis: \"Hey, can you share how you actually tell when something is a dark pattern? I'd have spotted it myself if I knew what to look for.\"",
                choices: [
                    { text: "Write a team-wide guide with examples", next: "refuse_help_guide" },
                    { text: "Explain personally, but not systematically", next: "refuse_help_private" }
                ]
            },
            refuse_help_guide: {
                text: "You write an internal doc titled \"Anti-patterns we don't ship,\" with examples and rationale. The guide gets passed around chats across the industry. Six months later an accelerator reaches out: they need an ethical-design consultant for their portfolio companies.\n\nThe PM finds out and DMs you: \"Do you understand that you're making the company look bad?\"",
                choices: [
                    { text: "Take the consulting role and tie it publicly to the company", next: "ending_ethic" },
                    { text: "Decline, to avoid antagonizing the PM", next: "ending_compromised" }
                ]
            },
            refuse_help_private: {
                text: "You explain to Denis on a single call. Six months later he leaves for a Head of Design role at an edtech startup. He writes: \"Remember that unsubscribe story? I tell it at every first-round interview here. Can you write me a recommendation?\"\n\nAt your company, nobody but Denis ever found out.",
                choices: [
                    { text: "Write a strong, detailed recommendation", next: "ending_ethic" },
                    { text: "Send a polite, generic one: \"Good designer, recommended\"", next: "ending_compromised" }
                ]
            },
            refuse_escalate: {
                text: "The Head of Design takes your side. At the next product review he publicly reverses the decision, citing \"brand and long-term loyalty metrics.\"\n\nA month later you're invited to lead a workshop on ethical design for the whole product org.",
                choices: [
                    { text: "Agree, and turn it into a recurring process", next: "refuse_escalate_yes" },
                    { text: "Decline — don't want to be \"the ethics person\"", next: "refuse_escalate_no" }
                ]
            },
            refuse_escalate_yes: {
                text: "The workshop becomes a quarterly design review. Within a year, two patterns that used to be \"normal\" are retired.\n\nThe PM stays sore and writes on your annual review: \"Tends to put ideology above speed.\" The Head of Design offers: \"I can move you to report directly to me.\"",
                choices: [
                    { text: "Take the transfer — continue the work from a new role", next: "ending_ethic" },
                    { text: "Stay under the PM, don't deepen the conflict", next: "ending_compromised" }
                ]
            },
            refuse_escalate_no: {
                text: "Another designer runs the workshop and it lands flat. Six months later you see the PM write in the team chat: \"We need the same flow as the competitor — confirmation by phone call to support.\"\n\nThis will roll back everything you achieved.",
                choices: [
                    { text: "Speak up openly, even at the cost of the relationship", next: "ending_ethic" },
                    { text: "Wait — let the Head of Design sort it out", next: "ending_compromised" }
                ]
            },
            comply_revert: {
                text: "At sprint review you show the reviews and support tickets. The PM defends the work, but the Head of Design backs the revert. A sprint later the unsubscribe is back to a single screen.\n\nSix months later you're invited to speak at a conference about the case.",
                choices: [
                    { text: "Accept and prepare an honest talk", next: "comply_revert_full" },
                    { text: "Accept, but tell only the redemption arc", next: "comply_revert_partial" }
                ]
            },
            comply_revert_full: {
                text: "You walk on stage and open with: \"I agreed first. That's part of the story.\" The room goes quiet.\n\nIn the Q&A a young designer asks: \"What would you have told yourself that night when you agreed?\"",
                choices: [
                    { text: "Answer honestly — I wouldn't have had the right word then", next: "ending_ethic" },
                    { text: "Answer vaguely — \"everyone walks their own path\"", next: "ending_compromised" }
                ]
            },
            comply_revert_partial: {
                text: "The talk is a hit. The case spreads across the industry: \"A designer who wasn't afraid to walk back a retention win.\" A month later you're offered a Design Lead role at a larger company.\n\nAt the interview the recruiter asks point-blank: \"Did you originally agree, or not?\"",
                choices: [
                    { text: "Set the record straight — tell it as it happened", next: "ending_ethic" },
                    { text: "Confirm the public version", next: "ending_compromised" }
                ]
            },
            comply_silent: {
                text: "You focus on other work. Metrics keep climbing, no one brings it up.\n\nEighteen months later — an interview at a new company. They ask for a measurable case from your portfolio. The best example is that 6% retention lift.",
                choices: [
                    { text: "Tell it honestly, acknowledge the dark pattern", next: "comply_silent_honest" },
                    { text: "Frame it as \"onboarding flow improvement\"", next: "comply_silent_spin" }
                ]
            },
            comply_silent_honest: {
                text: "The interviewer pauses for a moment: \"Thanks for the honesty. But we can't make you an offer.\"\n\nA month later, another interview. Same question. Same story.",
                choices: [
                    { text: "Tell it honestly again", next: "ending_compromised" },
                    { text: "This time, phrase it \"more safely\"", next: "ending_conformist" }
                ]
            },
            comply_silent_spin: {
                text: "You get the offer and take it. Six months in, the PM asks you to design a \"convenient\" way to remind users about subscriptions they've canceled.\n\nIt's the same dilemma — on a new subscription.",
                choices: [
                    { text: "Refuse — this time immediately and firmly", next: "ending_compromised" },
                    { text: "Do it — you already have a refined approach", next: "ending_conformist" }
                ]
            },

            ending_ethic: {
                text: "Over the next year, designers from other companies reach out about your guide or talk. Some write that it helped them push back on similar requests at their own companies.\n\nYou realize the story isn't only yours anymore."
            },
            ending_compromised: {
                text: "Your career continues normally. At some point you notice no new dark patterns are appearing in your products — but no one calls you an industry hero either.\n\nYou're fine with that. Sometimes — almost fine."
            },
            ending_conformist: {
                text: "You get the offer and accept. A year into the new job you draw up a similar flow — the manager needs numbers, and you already have a \"successful case.\"\n\nThree years later a junior designer says quietly at sprint review: \"Isn't this a dark pattern?\" You answer: \"Technically no, we have a confirmation step.\" You don't believe your own words."
            }
        },
        endings: {
            ending_ethic: {
                title: "Ethics as Influence",
                verdict: "Ethics didn't stop at a personal \"no\" — it became a practice that influenced others. That's the hardest and most important step."
            },
            ending_compromised: {
                title: "The Quiet Compromise",
                verdict: "You walked out with your spine straight, but without a loud trace. Sometimes that's enough — sometimes it isn't."
            },
            ending_conformist: {
                title: "The Habit of Agreeing",
                verdict: "One compromise opens the door to the next. A few years in, you stop distinguishing \"pragmatism\" from \"how everyone does it.\""
            }
        }
    },

    {
        id: 'doctor-trial',
        kicker: 'Medicine · Clinical Trials',
        title: "The Doctor's Dilemma",
        description: 'A patient asks to be enrolled in an experimental treatment. Half the participants will get a placebo. Who do you tell the truth to?',
        tags: ['medicine', 'consent', 'truth'],
        estimatedMinutes: 5,
        approxSteps: 4,
        comingSoon: true
    },

    {
        id: 'manager-layoff',
        kicker: 'Management · Layoffs',
        title: "The Manager's Dilemma",
        description: 'The CEO asks you to lay off half your team in a week — and keep it secret until announcement. One of your people is signing a mortgage on Monday.',
        tags: ['HR', 'loyalty', 'NDA'],
        estimatedMinutes: 5,
        approxSteps: 4,
        comingSoon: true
    },

    {
        id: 'journalist-source',
        kicker: 'Journalism · Sources',
        title: "The Journalist's Dilemma",
        description: "You're ready to publish a story about corruption. A judge demands you reveal your source. The source faces firing and lawsuits.",
        tags: ['media', 'anonymity', 'law'],
        estimatedMinutes: 5,
        approxSteps: 4,
        comingSoon: true
    },

    {
        id: 'scientist-data',
        kicker: 'Science · Data',
        title: "The Researcher's Dilemma",
        description: "Three weeks from the grant deadline, you notice: removing two \"anomalous\" data points makes the result statistically significant. Nobody would know.",
        tags: ['research', 'p-hacking', 'grant'],
        estimatedMinutes: 5,
        approxSteps: 4,
        comingSoon: true
    },

    {
        id: 'lawyer-confidential',
        kicker: 'Law · Confidentiality',
        title: "The Lawyer's Dilemma",
        description: 'In a private conversation, your client lets slip plans for a crime. Attorney-client privilege, or warn the potential victim?',
        tags: ['privilege', 'duty', 'risk'],
        estimatedMinutes: 5,
        approxSteps: 4,
        comingSoon: true
    },

    {
        id: 'auditor-finding',
        kicker: 'Audit · Finance',
        title: "The Auditor's Dilemma",
        description: "You've uncovered a money-laundering scheme. The firm's partner suggests \"rounding down\" the finding. The client pays your firm 40% of annual revenue.",
        tags: ['finance', 'independence', 'conflict of interest'],
        estimatedMinutes: 5,
        approxSteps: 4,
        comingSoon: true
    },

    {
        id: 'pilot-fatigue',
        kicker: 'Aviation · Safety',
        title: "The Pilot's Dilemma",
        description: "You're on hour 14 of duty with three hours of sleep. No replacement. 180 people on board. The captain says: \"We'll fly, it's fine.\"",
        tags: ['safety', 'protocol', 'pressure'],
        estimatedMinutes: 4,
        approxSteps: 4,
        comingSoon: true
    },

    {
        id: 'teacher-plagiarism',
        kicker: 'Education · Integrity',
        title: "The Teacher's Dilemma",
        description: 'A strong student submitted work written by an AI. If you report it — they lose their scholarship and their Master\'s spot in Berlin.',
        tags: ['AI', 'academic honesty', 'student future'],
        estimatedMinutes: 4,
        approxSteps: 4,
        comingSoon: true
    }
];
