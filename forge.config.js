module.exports = {
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
              repository: {
                owner: 'LeVillageDuCode',
                name: 'git@github.com:LeVillageDuCode/tuto-electron-publish.git'
              },
              prerelease: true
            }
        }
    ]
}