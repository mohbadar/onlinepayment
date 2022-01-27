# NSIA Team @ 2020
# This script adds all the anar framework libraries that are mentioned in the pom.xml file of the project
import re
import os
import subprocess
currentPath = os.path.dirname(__file__)
filePath = os.path.abspath(os.path.join(currentPath, '..','..','..','pom.xml'))
f = open(filePath, "r")
repoCloneLinks = []


def getRepoUrl(libName):
    r = re.search('>(.+?)<', libName)
    if r:
        repoCloneLinks.append(r.group(1))


# Parse out all the anar lib dependencies from pom.xml
def parseRepoLinks(fileData):
    commentted = False
    for l in fileData.readlines():
        # Check if the line is commented
        if l.strip().startswith("<!--"):
            commentted = True
        if not commentted and ("anar-lib" in l):
            getRepoUrl(l)
        if l.strip().endswith("-->"):
            commentted = False


parseRepoLinks(f)

# Change the execution path to the parent where we clone the repositories
executionPath = os.path.abspath(os.path.join(filePath, '..', '..'))
os.chdir(executionPath)

for rl in repoCloneLinks:
        if(not os.path.exists(rl)):
            repoLink = 'https://github.com/Anar-Framework/' + rl + '.git'
            subprocess.run(['git', 'clone', repoLink])

