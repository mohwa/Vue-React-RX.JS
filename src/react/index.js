import useState from "@react/useState";
import useEffect from "@react/useEffect";
import useMemo from "@react/useMemo";
import useCallback from "@react/useCallback";

function Component () {
  const [x, setXValue] = useState(4, Component);
  const [y, setYValue] = useState(5, Component);

  const xMemo = useMemo(() => 6, []);
  const yMemo = useMemo(() => x * y, [x, y]);

  const xfn = useCallback(() => console.log('xfn', x, y), []);
  const yfn = useCallback(() => console.log('yfn', x * y), [x, y]);

  console.log('START COMPONENT');

  xfn();
  yfn();

  useEffect(() => {
    console.log('A');
    setXValue(7);
  }, []);

  useEffect(() => {
    console.log('B', x, y, xMemo, yMemo);
  }, [x, y, xMemo, yMemo]);

  useEffect(() => {
    console.log('C');
    // setTimeout(() => {
    setYValue(8);
    // });
  }, []);

  useEffect(() => {
    console.log('D');
  }, []);
}

Component();
