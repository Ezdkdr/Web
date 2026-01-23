import type { TrainingModule } from '../types';

export const trainingContent: TrainingModule = {
    title: "Cybersecurity Awareness Training for Small Businesses in Canada",
    audience: "All employees (non-technical and technical)",
    estimatedDuration: "~45 minutes",
    purpose: "This training helps employees understand common cybersecurity risks, how those risks affect small businesses in Canada, and what practical actions each employee can take to protect company data, systems, customers, and themselves.",
    sections: [
        {
            id: "sec-1",
            title: "1. Why Cybersecurity Matters",
            duration: "5 minutes",
            content: [
                { type: "subheading", content: "What is Cybersecurity?" },
                { type: "paragraph", content: "Cybersecurity is the practice of protecting computers, networks, systems, and data from unauthorized access, attacks, damage, or theft." },
                { type: "subheading", content: "Why Small Businesses Are Targets" },
                { type: "paragraph", content: "Many people assume cybercriminals only target large corporations. In reality, small businesses are frequent targets because:" },
                {
                    type: "list", content: [
                        "They often have fewer security controls",
                        "Employees may not be trained on cyber risks",
                        "Attacks can be automated and indiscriminate"
                    ]
                },
                { type: "subheading", content: "Real-World Impact" },
                { type: "paragraph", content: "A cyber incident can lead to:" },
                {
                    type: "list", content: [
                        "Financial losses (fraud, ransom payments)",
                        "Business downtime",
                        "Loss of customer trust",
                        "Legal and regulatory consequences (especially under Canadian privacy laws)"
                    ]
                },
                { type: "subheading", content: "Your Role as an Employee" },
                { type: "paragraph", content: "Cybersecurity is not just an IT issue. Every employee plays a role in keeping the organization secure." }
            ],
            knowledgeCheck: [
                {
                    id: "q1-1",
                    text: "True or False: Only large companies are targeted by cybercriminals.",
                    type: "boolean",
                    options: ["True", "False"],
                    correctAnswer: "False",
                    feedback: "Small businesses are frequent targets due to fewer controls and automated attacks."
                },
                {
                    id: "q1-2",
                    text: "Name one potential impact of a cyberattack on a small business.",
                    type: "text",
                    correctAnswer: "financial losses business downtime loss of customer trust legal regulatory consequences",
                    feedback: "Impacts include financial losses, downtime, loss of trust, or legal consequences."
                }
            ]
        },
        {
            id: "sec-2",
            title: "2. Common Cyber Threats",
            duration: "10 minutes",
            content: [
                { type: "subheading", content: "2.1 Phishing and Social Engineering" },
                { type: "paragraph", content: "Phishing is when attackers try to trick you into revealing sensitive information or clicking malicious links." },
                { type: "heading", content: "Examples:" },
                {
                    type: "list", content: [
                        "Emails pretending to be from banks, managers, or vendors",
                        "Fake password reset messages",
                        "Urgent requests asking you to \"act now\""
                    ]
                },
                { type: "heading", content: "Red Flags:" },
                {
                    type: "list", content: [
                        "Unexpected emails or messages",
                        "Poor spelling or grammar",
                        "Urgent or threatening language",
                        "Requests for passwords or confidential data"
                    ]
                },
                { type: "heading", content: "Best Practices:" },
                {
                    type: "list", content: [
                        "Do not click links or open attachments unless you are sure",
                        "Verify requests using a separate communication method",
                        "Report suspicious emails to IT or management"
                    ]
                },
                { type: "subheading", content: "2.2 Malware and Ransomware" },
                { type: "paragraph", content: "Malware is malicious software designed to damage or steal information.\nRansomware encrypts files and demands payment to restore access." },
                { type: "heading", content: "Common infection methods:" },
                {
                    type: "list", content: [
                        "Malicious email attachments",
                        "Fake software updates",
                        "Infected websites"
                    ]
                },
                { type: "heading", content: "Best Practices:" },
                {
                    type: "list", content: [
                        "Never install unauthorized software",
                        "Keep systems updated",
                        "Back up important data regularly"
                    ]
                },
                { type: "subheading", content: "2.3 Password Attacks" },
                { type: "paragraph", content: "Weak or reused passwords are a major risk." },
                { type: "heading", content: "Attackers may use:" },
                {
                    type: "list", content: [
                        "Guessing",
                        "Password reuse from data breaches",
                        "Automated brute-force attacks"
                    ]
                },
                { type: "heading", content: "Best Practices:" },
                {
                    type: "list", content: [
                        "Use strong, unique passwords",
                        "Enable multi-factor authentication (MFA)",
                        "Never share passwords"
                    ]
                },
                { type: "subheading", content: "2.4 Insider Threats (Unintentional)" },
                { type: "paragraph", content: "Not all threats are malicious. Mistakes can cause serious incidents." },
                { type: "heading", content: "Examples:" },
                {
                    type: "list", content: [
                        "Sending data to the wrong recipient",
                        "Using unsecured Wi-Fi",
                        "Losing devices"
                    ]
                }
            ],
            knowledgeCheck: [
                {
                    id: "q2-1",
                    text: "What is phishing?",
                    type: "text",
                    correctAnswer: "trick revealing sensitive information clicking malicious links",
                    feedback: "Phishing is tricking you into revealing info or clicking malicious links."
                },
                {
                    id: "q2-2",
                    text: "List two signs of a suspicious email.",
                    type: "text",
                    correctAnswer: "unexpected poor spelling sensitive grammar urgent threatening",
                    feedback: "Signs include poor grammar, urgency, unexpected requests, etc."
                },
                {
                    id: "q2-3",
                    text: "What is ransomware?",
                    type: "text",
                    correctAnswer: "malware encrypts files demands payment",
                    feedback: "Ransomware encrypts files and demands payment."
                }
            ]
        },
        {
            id: "sec-3",
            title: "3. Passwords and Authentication Best Practices",
            duration: "7 minutes",
            content: [
                { type: "subheading", content: "Creating Strong Passwords" },
                { type: "paragraph", content: "A strong password:" },
                {
                    type: "list", content: [
                        "Is at least 12 characters long",
                        "Uses a mix of letters, numbers, and symbols",
                        "Is unique for each account"
                    ]
                },
                { type: "paragraph", content: "Passphrases Example: Coffee!Snow$Lake2026" },
                { type: "subheading", content: "Multi-Factor Authentication (MFA)" },
                { type: "paragraph", content: "MFA adds an extra layer of security by requiring:" },
                {
                    type: "list", content: [
                        "Something you know (password)",
                        "Something you have (phone, app)",
                        "Something you are (biometrics)"
                    ]
                },
                { type: "subheading", content: "Password Managers" },
                { type: "paragraph", content: "Password managers help:" },
                {
                    type: "list", content: [
                        "Store passwords securely",
                        "Generate strong passwords",
                        "Reduce password reuse"
                    ]
                }
            ],
            knowledgeCheck: [
                {
                    id: "q3-1",
                    text: "True or False: Reusing passwords is safe if the password is strong.",
                    type: "boolean",
                    options: ["True", "False"],
                    correctAnswer: "False",
                    feedback: "Never reuse passwords; if one site is breached, all your accounts are at risk."
                },
                {
                    id: "q3-2",
                    text: "What does MFA stand for?",
                    type: "mcq",
                    options: ["Multi-Factor Authorization", "Multi-Factor Authentication", "Multiple Firewalls Active"],
                    correctAnswer: "Multi-Factor Authentication",
                    feedback: "MFA stands for Multi-Factor Authentication."
                }
            ]
        },
        {
            id: "sec-4",
            title: "4. Email, Internet, and Device Security",
            duration: "8 minutes",
            content: [
                { type: "subheading", content: "Email Safety" },
                {
                    type: "list", content: [
                        "Be cautious with attachments and links",
                        "Check sender addresses carefully",
                        "Do not forward suspicious emails"
                    ]
                },
                { type: "subheading", content: "Safe Internet Browsing" },
                {
                    type: "list", content: [
                        "Avoid unknown websites",
                        "Do not download pirated or unauthorized content",
                        "Watch for HTTPS and warning messages"
                    ]
                },
                { type: "subheading", content: "Device Security" },
                {
                    type: "list", content: [
                        "Lock your computer when away",
                        "Do not leave devices unattended",
                        "Use company-approved devices when possible"
                    ]
                },
                { type: "subheading", content: "Mobile Devices" },
                {
                    type: "list", content: [
                        "Use screen locks",
                        "Keep operating systems updated",
                        "Avoid public charging stations"
                    ]
                }
            ],
            knowledgeCheck: [
                {
                    id: "q4-1",
                    text: "What should you do if you receive a suspicious attachment?",
                    type: "text",
                    correctAnswer: "do not open verify report it delete",
                    feedback: "Do not open it; verify with the sender or report it."
                },
                {
                    id: "q4-2",
                    text: "Why is locking your computer important?",
                    type: "text",
                    correctAnswer: "prevent unauthorized access protect data physical security",
                    feedback: "To prevent unauthorized access to data and systems."
                }
            ]
        },
        {
            id: "sec-5",
            title: "5. Data Protection and Privacy (Canada-Specific)",
            duration: "7 minutes",
            content: [
                { type: "subheading", content: "Understanding Sensitive Information" },
                { type: "paragraph", content: "Sensitive data may include:" },
                {
                    type: "list", content: [
                        "Customer names, addresses, phone numbers",
                        "Financial information",
                        "Login credentials",
                        "Employee records"
                    ]
                },
                { type: "subheading", content: "Canadian Privacy Responsibilities" },
                { type: "paragraph", content: "In Canada, organizations are expected to protect personal information and:" },
                {
                    type: "list", content: [
                        "Limit access to authorized personnel",
                        "Use information only for business purposes",
                        "Report privacy incidents when required"
                    ]
                },
                { type: "subheading", content: "Best Practices for Data Handling" },
                {
                    type: "list", content: [
                        "Only access data you need",
                        "Do not store company data on personal devices",
                        "Securely dispose of sensitive documents"
                    ]
                }
            ],
            knowledgeCheck: [
                {
                    id: "q5-1",
                    text: "Give one example of sensitive information.",
                    type: "text",
                    correctAnswer: "customer names addresses financial information login credentials employee records",
                    feedback: "Examples: Customer names, financial info, login credentials."
                },
                {
                    id: "q5-2",
                    text: "Who should have access to confidential data?",
                    type: "text",
                    correctAnswer: "authorized personnel only need to know",
                    feedback: "Only authorized personnel who need it for their work."
                }
            ]
        },
        {
            id: "sec-6",
            title: "6. Working Remotely and Public Wi-Fi",
            duration: "5 minutes",
            content: [
                { type: "subheading", content: "Risks of Public Wi-Fi" },
                { type: "paragraph", content: "Public Wi-Fi can be monitored by attackers." },
                { type: "subheading", content: "Best Practices" },
                {
                    type: "list", content: [
                        "Use a secure VPN if provided",
                        "Avoid accessing sensitive systems on public Wi-Fi",
                        "Never use public computers for work accounts"
                    ]
                }
            ],
            knowledgeCheck: [
                {
                    id: "q6-1",
                    text: "Why is public Wi-Fi risky?",
                    type: "text",
                    correctAnswer: "monitored by attackers insecure unencrypted",
                    feedback: "It can be monitored by attackers and is often insecure."
                },
                {
                    id: "q6-2",
                    text: "What tool can help secure remote connections?",
                    type: "mcq",
                    options: ["VPN", "Antivirus", "Firewall"],
                    correctAnswer: "VPN",
                    feedback: "A VPN (Virtual Private Network) encrypts your connection."
                }
            ]
        },
        {
            id: "sec-7",
            title: "7. Incident Reporting and Response",
            duration: "3 minutes",
            content: [
                { type: "subheading", content: "What Is a Security Incident?" },
                { type: "heading", content: "Examples:" },
                {
                    type: "list", content: [
                        "Clicking a suspicious link",
                        "Lost or stolen device",
                        "Unexpected system behavior"
                    ]
                },
                { type: "subheading", content: "What to Do" },
                {
                    type: "list", content: [
                        "Report immediately to IT or management",
                        "Do not try to hide mistakes",
                        "Quick reporting reduces damage"
                    ]
                }
            ],
            knowledgeCheck: [
                {
                    id: "q7-1",
                    text: "True or False: You should wait to report an incident until you are sure.",
                    type: "boolean",
                    options: ["True", "False"],
                    correctAnswer: "False",
                    feedback: "Report IMMEDIATELY. Quick reporting reduces damage."
                }
            ]
        },
        {
            id: "sec-8",
            title: "8. Final Assessment and Key Takeaways",
            duration: "5 minutes",
            content: [
                { type: "subheading", content: "Key Takeaways" },
                {
                    type: "list", content: [
                        "Cybersecurity is everyone’s responsibility",
                        "Be cautious with emails and links",
                        "Use strong passwords and MFA",
                        "Protect devices and sensitive data",
                        "Report incidents immediately"
                    ]
                }
            ]
            // Final assessment questions are separate or handled by the Exam component
        }
    ]
};

export const finalAssessmentQuestions = [
    {
        id: "fa-1",
        text: "What is the most common way cyberattacks begin?",
        type: "mcq",
        options: ["Phishing emails", "Breaking into the office", "Stealing a laptop"],
        correctAnswer: "Phishing emails"
    },
    {
        id: "fa-2",
        text: "Name two best practices for password security.",
        type: "mcq",
        options: ["Use unique passwords and MFA", "Write them down and share them", "Change them every day and use 5 characters"],
        correctAnswer: "Use unique passwords and MFA"
    },
    {
        id: "fa-3",
        text: "What should you do if you suspect a phishing email?",
        type: "mcq",
        options: ["Report it to IT", "Reply and ask if it's real", "Click the link to check"],
        correctAnswer: "Report it to IT"
    },
    // Derived questions
    {
        id: "fa-4",
        text: "Which of these is a risk of Public Wi-Fi?",
        type: "mcq",
        options: ["Data can be intercepted", "It costs too much", "It is too fast"],
        correctAnswer: "Data can be intercepted"
    },
    {
        id: "fa-5",
        text: "Who is responsible for cybersecurity in a small business?",
        type: "mcq",
        options: ["Everyone", "Only the owner", "Only IT support"],
        correctAnswer: "Everyone"
    }
];
