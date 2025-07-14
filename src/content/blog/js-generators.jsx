import Image from 'next/image';

export default function JavaScriptGeneratorsOverview() {
  return (
    <div>
      <Image
        src="/blog/js-generators.png"
        alt="JavaScript Generators Logo"
        width={800}
        height={400}
      />
      <p>Apr 30, 2023 ・🕒 3 min read</p>

      <h2>What is Generators:</h2>
      <p>
        Generators are functions that can be exited and later re-entered. Their
        context (variable bindings) will be saved across re-entrances. – MDN.
      </p>

      <h2>Things to know about Generators:</h2>
      <ol>
        <li>
          Generator is a special type of function that can be paused and resumed
          at any time.
        </li>
        <li>
          They’re created using the <code>function*</code> syntax. When a
          generator is created, the code inside it isn’t executed immediately.
          Instead, the code is generated into a sequence of values that you can
          access by using a loop or accessing one at a time using the{' '}
          <code>next()</code> method.
        </li>
        <li>
          You can use <code>for...of</code> loop (or <code>while</code> or
          loops) to iterate over their values.
        </li>
        <li>
          <code>next()</code> method is used to resume the execution of a
          generator and get the next value. It returns an object with two
          properties:
          <ul>
            <li>
              <code>value</code>: which is the value returned by the{' '}
              <code>yield</code> statement, and
            </li>
            <li>
              <code>done</code>: (Boolean value), indicates whether the
              generator has completed its execution.
            </li>
          </ul>
        </li>
      </ol>

      <h2>Simple Example:</h2>
      <pre>
        <code>
          {`function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const generate = myGenerator();
console.log(generate.next().value); // 1
console.log(generate.next().value); // 2
console.log(generate.next().value); // 3
console.log(generate.next().value); // undefined // there are no more values to yield from myGenerator`}
        </code>
      </pre>

      <h2>`yield` keyword:</h2>
      <p>
        The <code>yield</code> keyword is similar to the <code>return</code>{' '}
        statement which terminates a function. However, instead of exiting out
        of the function, <code>yield</code> suspends/pauses the execution
        context of the generator (thus allowing the function to continue running
        in the background until it is resumed by calling its <code>next()</code>{' '}
        method again), besides returning the specified value.
      </p>

      <h2>Pause a function:</h2>
      <p>
        A paused function can create a closure, which is a block of code that
        has been temporarily stopped at a certain point in its execution, but it
        can also retain the position of that function so it can be resumed back
        and continue running.
      </p>

      <h2>Can we use return statement inside a Generator?</h2>
      <pre>
        <code>
          {`function* anotherGenerator() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

const generate = anotherGenerator();
console.log(generate.next()); // { value: 1, done: false }
console.log(generate.next()); // { value: 2, done: false }
console.log(generate.next()); // { value: 3, done: false }
console.log(generate.next()); // { value: 4, done: true } // using return
console.log(generate.next()); // { value: undefined, done: true }`}
        </code>
      </pre>

      <h2>Generators VS Functions:</h2>
      <Image
        src="/blog/functions-vs-generators.png"
        alt="Functions vs Generators Diagram"
        width={800}
        height={400}
      />

      <h2>Benefits:</h2>
      <ul>
        <li>
          <strong>Control the flow:</strong> Dynamic control over our functions:
          we can literally control the execution of our functions at any point
          during its iteration.
        </li>
        <li>
          <strong>Call by need:</strong> It is a way of evaluating expressions
          only when it is used/needed.
        </li>
        <li>
          <strong>Memory Efficient:</strong> The ability to use the minimum
          amount of memory necessary to accomplish a particular task.
        </li>
      </ul>

      <h2>Use-cases:</h2>
      <p>
        Generators can be useful when you want to produce a sequence of values
        without storing all of them in memory. Here are some particular
        use-cases: iterating over complex data structures, producing large data
        sets, generating infinite sequences...
      </p>
    </div>
  );
}
