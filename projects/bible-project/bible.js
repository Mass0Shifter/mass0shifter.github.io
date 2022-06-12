class Bible {
    constructor(data) {
        this.oldTestament = new Testament(
            new Book(),
            0,
        );
        this.newTestament = new Testament();
    }
}