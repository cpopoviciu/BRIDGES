//This is the contributor manager for the main site
//const maxMembers = 20;
const maxMemberInfo = 6;
var contriList = LinkedList();

function addNewMember(){
    
}

function addMember (name, role, imgSrc, linkedin, github, email){
    console.log("Add Member Called");
    var newMember = [maxMemberInfo];
    newMember[0] = name;
    newMember[1]= role;
    newMember[2] = imgSrc;
    newMember[3] = github;
    newMember[4] = email;
    contriList.add(newMember);
    addMemberUI(name,role,imgSrc,linkedin,github,email);
}

function addMemberUI(name,role,imgSrc,linkedin,github,email){
    let contriSection = document.getElementById("team-list");
    console.log(contriSection.id);
    let indivSection = document.createElement("section");
    let image = document.createElement("img");
    image.src = imgSrc;

    let contriHeader = document.createElement("h3");
    contriHeader.textContent = name;

    let title = document.createElement("p");
    title.textContent = role;

    let divLinks = document.createElement("div");
    divLinks.className = "content";

    let ulLinks = document.createElement("ul");
    ulLinks.className = "icons";

    let linkedLink = document.createElement("li");
    let linkedLinkActive = document.createElement("a");
    linkedLinkActive.href = linkedin;
    linkedLinkActive.className = "icon brands style2 fa-linkedin-in";
    let linkedLabel = document.createElement("span");
    linkedLabel.className = "label";
    linkedLabel.textContent = "LinkedIn";

    linkedLinkActive.append(linkedLabel);
    linkedLink.append(linkedLinkActive);

    let gitLink = document.createElement("li");
    let gitLinkActive = document.createElement("a");
    gitLinkActive.href = github;
    gitLinkActive.className = "icon brands style2 fa-github";
    let gitLabel = document.createElement("span");
    gitLabel.className = "label";
    gitLabel.textContent = "Github";

    gitLinkActive.append(gitLabel);
    gitLink.append(gitLinkActive);

    let emailLink = document.createElement("li");
    let emailLinkActive = document.createElement("a");
    emailLinkActive.href = email;
    emailLinkActive.className = "icon style2 fa-envelope";
    let emailLabel = document.createElement("span");
    emailLabel.className = "label";
    emailLabel.textContent = "Email";

    emailLinkActive.append(emailLabel);
    emailLink.append(emailLinkActive);
    
    ulLinks.append(linkedLink);
    ulLinks.append(gitLink);
    ulLinks.append(emailLink);
    divLinks.append(ulLinks);

    indivSection.append(contriHeader);
    indivSection.append(image);
    indivSection.append(title);
    indivSection.append(divLinks);

    contriSection.append(indivSection);
}

function loadContributors(){
    addMember("Dr. Bijan Jabbari", "Principal Investigator", "images/gallery/faces/bijan.jpg","","","mailto:bjabbari@gmu.edu");
    addMember("Jerry Sobieksi", "Co-Principal Investigator", "images/gallery/faces/jerry.jpg","","","mailto:jsobiesk@gmu.edu");
    addMember("Dr. Ciprian Popoviciu", "Co-Principal Investigator", "images/gallery/faces/pop.jpg","","","mailto:popoviciuc18@ecu.edu");
    addMember("Colby Sawyer", "Undergrad CS Student", "images/gallery/faces/cls.jpg", "https://www.linkedin.com/in/colby-sawyer-65b642182/", "https://github.com/ColbySawyer7", "mailto:sawyerc17@students.ecu.edu")
}