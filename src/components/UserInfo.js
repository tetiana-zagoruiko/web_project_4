class UserInfo {
    constructor(nameSelector, jobSelector) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
    }

    getUserInfo() {
        const userInfo = {
            name: this._nameElement.textContent,
            title: this._jobElement.textContent
        };
        return userInfo;
    }

    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._jobElement.textContent = data.title;
    }
}

export default UserInfo;
