class UserInfo {
    constructor(nameSelector, jobSelector) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
    }

    getUserInfo() {
        document.getElementById('profile-name').placeholder = document.querySelector(this._nameSelector).textContent;
        document.getElementById('profile-text').placeholder = document.querySelector(this._jobSelector).textContent;
    }

    setUserInfo(data) {
        document.querySelector(this._nameSelector).textContent = data.name;
        document.querySelector(this._jobSelector).textContent = data.title;
    }
}

export default UserInfo;
