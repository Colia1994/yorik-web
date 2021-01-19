export type PoolTaskElement = {
  task: any
  resolve: any
  reject: any
}

export class Pool {
  private runTask: (task: any) => Promise<any>
  private queue: PoolTaskElement[]
  private processing: PoolTaskElement[]
  private limit: number

  constructor(runTask: (task: any) => Promise<any>, limit: number) {
    this.runTask = runTask
    this.queue = []
    this.processing = []
    this.limit = limit
  }

  enqueue(task: any) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        task,
        resolve,
        reject,
      })
      this.check()
    })
  }

  run(item: PoolTaskElement) {
    this.queue = this.queue.filter((v) => v !== item)
    this.processing.push(item)
    this.runTask(item.task).then(
      () => {
        this.processing = this.processing.filter((v) => v !== item)
        item.resolve()
        this.check()
      },
      (err) => item.reject(err)
    )
  }

  check() {
    const processingNum = this.processing.length
    const availableNum = this.limit - processingNum
    this.queue.slice(0, availableNum).forEach((item) => {
      this.run(item)
    })
  }
}
