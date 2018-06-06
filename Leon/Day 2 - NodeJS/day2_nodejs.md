# Node JS

### Event Loop

Node JS runs on a single main thread. When promises/async
tasks are made, they spawn a thread and is placed in a queue.
When that task is completed, the main thread will retrieve
the response.
