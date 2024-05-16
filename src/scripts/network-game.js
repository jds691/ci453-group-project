var scenarios = [
  {
      scenario: "Social Media Friend Requests",
      description: "You receive a friend request on social media from someone you recently met at a school event. They have mutual friends with you and seem friendly.",
      assessment: "Safe. Accepting friend requests from acquaintances or individuals you've recently met in real life is generally safe, especially if you have mutual connections."
  },
  {
      scenario: "Sharing Personal Information Online",
      description: "You're asked to fill out an online survey that requests personal information such as your full name, address, phone number, and school.",
      assessment: "Dangerous. Sharing personal information online can make you vulnerable to identity theft, cyber-stalking, or targeted advertising. Avoid providing sensitive information unless absolutely necessary and trusted."
  },
  {
      scenario: "Suspicious Email Attachments",
      description: "You receive an email from your school source with an attachment containing a document related to your school project.",
      assessment: "Safe. Opening email attachments from trusted sources, such as your school or a known colleague, is generally safe. However, always scan attachments with antivirus software before opening them to ensure they're safe."
  },
  {
      scenario: "Online Shopping on Websites",
      description: "You're shopping online for a birthday gift on websites with 'https://' URLs and padlock symbols in the address bar.",
      assessment: "Safe. Reputable online retailers prioritize customer security and encryption. It’s important to shop on a reputable website with secure payment options and customer reviews."
  },
  {
      scenario: "Clickbait Links on Social Media",
      description: "You come across a social media post with a sensational headline claiming to reveal shocking secrets about a celebrity. The post includes a link to an external website.",
      assessment: "Potentially Dangerous. Clicking on clickbait links can lead to malicious websites designed to steal your personal information or install malware on your device. Exercise caution and verify the credibility of sources before clicking on unfamiliar links."
  },
  {
      scenario: "Downloading Apps from Unofficial Sources",
      description: "You find an app you've been wanting to download, but it's not available on the official app store. Instead, you come across a website offering a download link for the app.",
      assessment: "Dangerous. Downloading apps from unofficial sources can expose your device to malware or viruses that can compromise its security and functionality. Stick to downloading apps from trusted app stores to minimize the risk of downloading malicious software."
  },
  {
      scenario: "Public Wi-Fi Networks",
      description: "You're at a café and connect to the public Wi-Fi network to check your email and social media accounts.",
      assessment: "Potentially Dangerous. Public Wi-Fi networks are often unsecure, making it easy for hackers to intercept your data. Avoid accessing sensitive information or making online transactions on public Wi-Fi networks unless using a virtual private network (VPN) for added security."
  }
];

var currentScenarioIndex;

function displayScenario(index) {
  var scenario = scenarios[index];
  document.getElementById('scenario').innerHTML = "<h3>" + scenario.scenario + "</h3><p>" + scenario.description + "</p>";
  document.getElementById('assessment').textContent = scenario.assessment;
}

function checkAnswer(answer) {
  var correctAnswer = scenarios[currentScenarioIndex].assessment.includes('Safe');
  var result = answer === 'safe' ? correctAnswer : !correctAnswer;
  document.getElementById('result').textContent = result ? 'Correct!' : 'Wrong!';
}

function handleChoice(choice) {
  checkAnswer(choice);
  document.getElementById('explanation').classList.remove('hidden');
}

function startGame() {
  currentScenarioIndex = 0;
  displayScenario(currentScenarioIndex);
}

document.getElementById('safe-btn').addEventListener('click', function() {
  handleChoice('safe');
});

document.getElementById('danger-btn').addEventListener('click', function() {
  handleChoice('danger');
});

document.getElementById('next-btn').addEventListener('click', function() {
  currentScenarioIndex = (currentScenarioIndex + 1) % scenarios.length;
  displayScenario(currentScenarioIndex);
  document.getElementById('explanation').classList.add('hidden');
  document.getElementById('result').textContent = '';
});

startGame();