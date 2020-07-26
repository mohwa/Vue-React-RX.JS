import Observable from '@rx/observable';
import Subject from '@rx/subject';

const observable1 = Observable.create((observer) => {
  observer.next(1);
  observer.complete();
  observer.next(2);
});

observable1.subscribe(
  (v) => console.log('observable1', v),
  null,
  () => console.log('observable1 COMPLETE')
);

const observable2 = Observable.create((observer) => {
  observer.next(3);
  observer.next(4);
  throw new Error('throw err test');
  observer.next(5);
});

observable2.subscribe(
  (v) => console.log('observable2', v),
  (v) => console.log('ERROR', v),
  () => console.log('observable2 COMPLETE')
);

const observable3 = Observable.create((observer) => {
  observer.next(6);
  observer.complete();
  observer.next(7);
});

observable3.subscribe(
  (v) => console.log('observable3', v),
  null,
  () => console.log('observable3 COMPLETE')
);

const subject = Subject.factory();

subject.subscribe({
  next: (v) => console.log('subject1', v),
  complete: () => console.log('subject1 COMPLETE')
});

subject.subscribe({
  next: (v) => console.log('subject2', v),
  complete: () => console.log('subject2 COMPLETE')
});

subject.next(1);
subject.next(2);
subject.complete();
subject.next(3);
