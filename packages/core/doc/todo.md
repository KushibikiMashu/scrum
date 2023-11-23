機能追加

- [ ] オフライン開催とオンライン開催を選べる

```ts
abstract class Place {
  abstract getDescription(): string
}

class OfflinePlace extends Place {
  constructor(
    public readonly address: string,
    public readonly roomNumber?: string
  ) {
    super()
  }

  getDescription(): string {
    return this.roomNumber ? `${this.address}, Room: ${this.roomNumber}` : this.address
  }
}

class OnlinePlace extends Place {
  constructor(
    public readonly url: string,
    public readonly platform: string
  ) {
    super()
  }

  getDescription(): string {
    return `${this.platform} - ${this.url}`
  }
}
```
