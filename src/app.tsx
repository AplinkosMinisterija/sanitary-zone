import { isEmpty } from "lodash";
import { companyCode } from "lt-codes";
import { memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Button from "./components/buttons/Button";
import ButtonsGroup from "./components/buttons/ButtonsGroup";
import NumericTextField from "./components/fields/NumericTextField";
import DefaultLayout from "./components/layouts/DefaultLayout";
import { device } from "./styles";
import {
  activities,
  activityCode,
  activityRange,
  activityRangeValue,
  codes,
  companies,
  companyCodes,
  ranges,
  table
} from "./utils/data";
import {
  buttonLabels,
  descriptions,
  inputLabels,
  tableLabels,
  titles
} from "./utils/texts";

interface RangeOption {
  id: number;
  label: string;
}

interface Activity {
  id: number;
  label: string;
  area?: string;
}

interface ActivityInfo {
  mainActivity?: Activity;
  otherActivities?: Activity[];
  children: ActivityInfo[];
}

function App() {
  const [input, setInput] = useState("");
  const [currentCode, setCurrentCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!companyCode.validate(input).isValid) {
      return setError(inputLabels.badCompanyCode);
    }
    setCurrentCode(input);
    setInput("");
  };

  const handleSetInput = (value) => {
    setInput(value);
    setError("");
  };

  const RenderTableContent = ({ filteredActivities, tableInfo }) => {
    const parsedTableInfo: {
      codeId: number;
      table: { label: string; bottomLabel: string };
      hasRange: boolean;
    } = JSON.parse(tableInfo);

    const [currentRange, setCurrentRanges] = useState<number>();
    const [options, setOptions] = useState<(RangeOption | undefined)[]>([]);
    const [activities, setActivities] = useState<ActivityInfo[]>([]);

    useEffect(() => {
      const activities: ActivityInfo[] = Object.keys(
        filteredActivities[tableInfo]
      ).map((curr: any) => {
        if (parsedTableInfo.hasRange) {
          const activityRanges = activityRange
            .filter((activityRange) => {
              return (
                activityRange.activityId ===
                filteredActivities[tableInfo][curr][0].id
              );
            })
            .map((item) => ranges.find((r) => r.id! === item?.rangeId!));
          if (!currentRange) {
            setCurrentRanges(ranges?.[0]?.id);
          }
          setOptions((prev) => [...prev, ...activityRanges]);
        }

        const activities = filteredActivities[tableInfo][curr].reduce(
          (innObj, innCurr) => {
            if (!parsedTableInfo.hasRange && !innCurr.area) {
              innObj.mainActivity = innCurr;
              return innObj;
            }
            innObj.otherActivities.push(innCurr);

            return innObj;
          },
          { mainActivity: undefined, otherActivities: [] }
        );

        const children = codes
          .filter((c) => c.parentCode === Number(curr))
          .map((c) => c.id);

        return { ...activities, children };
      });

      setActivities(activities!);
    }, [parsedTableInfo.hasRange, tableInfo, filteredActivities]);

    const getRangeArea = (id) => {
      const activityRangeId = activityRange.find(
        (activityRange) =>
          activityRange.activityId === id &&
          currentRange! === activityRange.rangeId
      )?.id;

      return (
        activityRangeValue.find((a) => a.rangeActivityId === activityRangeId)
          ?.area || "Nenustatoma"
      );
    };

    return (
      <Table>
        {parsedTableInfo.hasRange && (
          <div> {tableLabels.selectPerformance}</div>
        )}
        <ButtonsGroup
          options={options}
          onChange={(option) => setCurrentRanges(option.id)}
          isSelected={(option) => option.id === currentRange}
        />

        <TableRow>
          <HeaderItem>{parsedTableInfo?.table.label}</HeaderItem>
          <HeaderItem> {tableLabels.area}</HeaderItem>
        </TableRow>
        {activities.map((activity) => {
          return (
            <>
              <strong>{activity?.mainActivity?.label}</strong>
              {activity?.otherActivities?.map((item) => {
                return (
                  <TableRow>
                    <BodyItem>{item?.label}</BodyItem>
                    <BodyItem>{item?.area || getRangeArea(item?.id)}</BodyItem>
                  </TableRow>
                );
              })}
              {!isEmpty(activity?.children) && (
                <RenderTable ids={activity?.children} />
              )}
            </>
          );
        })}

        {parsedTableInfo?.table.bottomLabel && (
          <SmallText>{parsedTableInfo?.table.bottomLabel}</SmallText>
        )}
      </Table>
    );
  };

  const RenderTable = ({ ids }) => {
    const filteredActivities = activityCode
      .filter((ac) => ids.includes(ac.codeId))
      .reduce((obj, curr) => {
        const activity = activities.find((a) => a.id === curr.activityId);
        const hasRange = !isEmpty(
          activityRange.filter(
            (activityRange) => activityRange.activityId === activity?.id
          )
        );
        const currentCode = codes.find((c) => c.id === curr.codeId);
        const currentTable = table.find((t) => t.id === currentCode?.tableId!);

        const tableInfo = JSON.stringify({
          table: currentTable,
          hasRange
        });

        if (obj?.[tableInfo!]?.[currentCode?.id!]) {
          obj[tableInfo!][currentCode?.id!].push(activity);
        } else {
          obj[tableInfo!] = {
            ...obj[tableInfo!],
            [currentCode?.id!]: [activity]
          };
        }

        return obj;
      }, {});

    return (
      <>
        {Object.keys(filteredActivities).map((tableInfo) => {
          return (
            <RenderTableContent
              filteredActivities={filteredActivities}
              tableInfo={tableInfo}
            />
          );
        })}
      </>
    );
  };

  const MemoizedRenderTable = memo(RenderTable);

  const renderContent = useMemo(() => {
    if (!currentCode) {
      return <></>;
    }

    const filteredCompanyCodes = companyCodes.filter(
      (company) => company.companyCode === Number(currentCode)
    );

    if (isEmpty(filteredCompanyCodes))
      return (
        <Empty>
          {descriptions.notFound}{" "}
          <a href="/info.pdf" download="info" target="_blank">
            čia
          </a>
        </Empty>
      );

    const company = companies.find(
      (company) => company.code === Number(currentCode)
    );

    return (
      <>
        <CompanyInfo>
          <div>
            {tableLabels.companyName} <strong>{company?.name}</strong>{" "}
          </div>
          <div>
            {tableLabels.companyCode} <strong>{company?.code}</strong>{" "}
          </div>
        </CompanyInfo>
        <MemoizedRenderTable
          ids={filteredCompanyCodes.map((item) => item.codeId)}
        />
      </>
    );
  }, [currentCode]);

  return (
    <DefaultLayout>
      <div>
        <H1>
          {titles.sanitaryProtection} <Coloring>{titles.area}</Coloring>
        </H1>
        <P>{descriptions.main}</P>
        <SearchRow>
          <NumericTextField
            placeholder="Įmonės kodas"
            error={error}
            value={input}
            onChange={handleSetInput}
          />
          <Button onClick={handleSubmit}>{buttonLabels.findOut}</Button>
        </SearchRow>
        {renderContent}
      </div>
    </DefaultLayout>
  );
}

const P = styled.p`
  line-height: 28px;
  max-width: 774px;
  margin: 12px auto 48px auto;
`;

const H1 = styled.h1`
  font-size: 5.25rem;
  line-height: 1em;
  font-weight: 900;
  margin: 0;
  @media ${device.mobileL} {
    font-size: 3rem;
`;

const Coloring = styled.span`
  color: #009886;
`;

const Empty = styled.div`
  background-color: #f4f4f6;
  padding: 24px;
  text-align: center;
  margin-top: 48px;
`;

const SearchRow = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 125px;
  gap: 12px;
  margin: auto;
  max-width: 500px;
  font-size: 1rem;
  @media ${device.mobileL} {
    grid-template-columns: 1fr;
  }
`;

const Table = styled.div`
  text-align: left;
  margin-top: 64px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 135px;
  gap: 8px;
  margin: 8px 0px;
  font-size: 1rem;
  :hover {
    div {
      background-color: #b7e1dd;
    }
  }
`;

const HeaderItem = styled.div`
  background-color: #b7e1dd;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const BodyItem = styled.div`
  background-color: #f4f4f6;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const CompanyInfo = styled.div`
  margin: 64px 0px -32px 0px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: start;
`;

const SmallText = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
`;

export default App;
