# PrivaTO-DO

This api is a **TODO list** and **note-taking**. The main difference of this app is that the tasks are
stored in a [blockchain](https://builtin.com/blockchain) that creates a history with all the changes and modifications
of the different notes/tasks.

## How it works?

This api allows the user add new notes and mark them as completed. The flow is always the same, first we need to add new
note/task and then these are saved on the Blockchain. In order to make the blockchain data persistent we need to store
Blockchain in a file.

You could find the API description on the [OpenAPI description file](/api.spec.yaml)

### Workflow

The workflow of the api is as follows:

1. Send request to the API to **add** or **mark as completed** any task
2. Load the _Blockchain_ data from the file, if exists
3. Create a _Block_ with the new todo/task data
4. Add the new Block to the _Blockchain_
5. Save the Blockchain with the new data on a file

## Technical Considerations

Keep in mind the following:

1. Related with the blockchain:
    1. Every Block has multiple properties:
        1. `timestamp`: the timestamp for the moment when the block was created
        2. `lastHash`: hash of the previous block on the Blockchain
        3. `data`: information we want to store in the block (in our case the description of the task)
        4. `hash`: a SHA256 string for the block, calculated concatenating the timestamp, lastHash and data.
    2. The implementation of the Blockchain must follow these contract:
    ```
    interface Blockchain {
      /** Adds new block to blockchain */
      addBlock(block: Block): Block
      /**
       * Validates the chain by checking if:
       * - every element's last hash value matches previous block's hash
       * - data hasn't been tampered (which will produce a different hash value)
       */
      isValid(blockchain: Blockchain): boolean
      /** The new blockchain that is a candidate for replacing the current blockchain */
      replace(blockchain: Blockchain): boolean
    }
    
    interface Block {
      /** Generate the hash for the given block */
      static generateHashFromBlock(block: Block): string
    }
    ```

## Tips

* You can think about the Blockchain as a sort of [Linked List](https://www.programiz.com/dsa/linked-list), which have
  some extra properties to ensure the validity of the items and the list as a whole.
* When you have to update a task or note of the application (i.e. when mark it as completed), you will have to create a
  new Block with this information, but the previous one will remain in the Blockchain with the outdated information. 

## Technical requirements

* Create a **clean**, **maintainable** and **well-designed** code. We expect to see a good and clear architecture that
  allows to add or modify the solution without so much troubles.
* **Test** your code until you are comfortable with it. We don't expect a 100% of Code Coverage but some tests that
  helps to have a more stable and confident base code.

To understand how you take decisions during the implementation, **please write a COMMENTS.md** file explaining some of
the most important parts of the application. You would also be able to defend your code through
[Rviewer](https://rviewer.io), once you submit your solution.

---

## How to submit your solution

* Push your code to the `devel` branch - we encourage you to commit regularly to show your thinking process was.
* **Create a new Pull Request** to `main` branch & **merge it**.

Once merged you **won't be able to change or add** anything to your solution, so double-check that everything is as
you expected!

Remember that **there is no countdown**, so take your time and implement a solution that you are proud!

---

<p align="center">
  If you have any feedback or problem, <a href="mailto:help@rviewer.io">let us know!</a> 🤘
  <br><br>
  Made with ❤️ by <a href="https://rviewer.io">Rviewer</a>
</p>
