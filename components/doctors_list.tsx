'use client'
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { doctors_specialties, registered_doctors } from '@/constants';
import Image from 'next/image';
import { DropDownWithSearchBar } from './drop_down_component';
import { useChat } from '@/app/context/ChatContext';
import { useRouter } from 'next/navigation';
import { toast_msg } from './toast';
import { get_auth_request } from '@/app/api';

interface DoctorProps {
    first_name: string;
    last_name: string;
    description: string;
    country: string;
    registered_as: string;
    speciality: string;
    languages_spoken: string[];
    avatar: string;
    current_hospital_or_clinic: string;
    physician_id: string;
}

const DoctorsList = () => {
    const [filter_doctor, setFilter_doctor] = useState('');
    const [doctors, setDoctors] = useState<DoctorProps[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
    const { selected_user, setSelected_user } = useChat();
    const router = useRouter();
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Filter doctors based on specialty
    const filteredDoctors = useMemo(() => {
        return doctors.filter((data) => {
        const full_name = `${data.first_name.toLowerCase()} ${data.last_name.toLowerCase()}`;

        return filter_doctor === '' || data.speciality.toLowerCase() === filter_doctor.toLowerCase();
        });
    }, [doctors, filter_doctor]);

  // Fetch doctors from server
    const fetch_doctors_from_server = useCallback(async (pageNum: number) => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const res = await get_auth_request(`auth/all-physicians/${pageNum}/${10}`);
            console.log(res)

            if (res.status === 200 || res.status === 201) {
                console.log(res.data?.data.physicians)

                const new_doctors: DoctorProps[] = res.data?.data.physicians || [];

                setDoctors([...doctors, ...new_doctors]);

                setHasMore(new_doctors.length === 6); // Assume more exist if full batch returned

            } else if (res.status === 401 ){
                toast_msg({title: 'Session has expired, kindly login again'})
                router.push('/login')
            }
            else if (res.status === 500) {
                toast_msg({ title: 'Network error, kindly refresh your page.', type:'danger' });
                router.refresh();
            } else {
                const error_msg = `${res.response?.data?.msg || 'An error occurred while fetching doctors.'}`;
                toast_msg({ title: error_msg, type:'danger' });
            }
        } catch (error) {
            console.error(error);
        } finally {
        setLoading(false);
        }
    }, [loading, hasMore, router]);

    // Initial fetch on mount
    useEffect(() => {
        fetch_doctors_from_server(1);
    }, []);

  // Handle infinite scroll
    useEffect(() => {
        if (!hasMore || loading) return;

            observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                setPage((prev) => {
                    const nextPage = prev + 1;
                    fetch_doctors_from_server(nextPage);
                    return nextPage;
                });
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore, loading]);

    return (
        <div className="w-full flex flex-col gap-5 -mt-2">
            <div className="w-full flex max-sm:flex-col items-center justify-start gap-5">
                <div className="w-full flex items-center gap-3 justify-between sm:justify-start h-[45px]">
                <button
                    className="h-full rounded-sm duration-150 border border-gray-300 text-sm bg-white hover:bg-[#fafafa] px-7"
                    onClick={() => setFilter_doctor('General Practice')}
                >
                    General Doctor
                </button>
                <button
                    className="h-full rounded-sm duration-150 border border-gray-300 text-sm bg-white hover:bg-[#fafafa] px-10"
                    onClick={() => setFilter_doctor('')}
                >
                    Specialist
                </button>
                </div>

                <div className="sm:w-[350px] w-full">
                <DropDownWithSearchBar
                    dropArray={doctors_specialties}
                    selected_item={filter_doctor}
                    setSelected_item={setFilter_doctor}
                />
                </div>
            </div>

            <p className="text-md font-semibold">All Doctors</p>

        <div className="w-full max-h-[800px] overflow-y-auto scrollbar-hidden max-sm:-mt-2 -mt-1 hide-scrollbar">
            {filteredDoctors.length === 0 ? (
                <div className="w-full flex h-[400px] sm:h-[200px] rounded-lg bg-white p-5 items-center justify-center">
                    <p className="text-sm text-gray-600 text-center py-2">No doctors found with the selected criteria</p>
                </div>
            ) : (
            <div className="w-full flex flex-col gap-3 temp-300 hide-scrollbar">
                {filteredDoctors.map((data: DoctorProps) => {
                const { first_name, last_name, description, country, registered_as, speciality, languages_spoken, avatar, physician_id } = data;

                // const imageSrc = useMemo(() => {
                //     if (!avatar || imageErrors[physician_id]) return '/default-doctor.svg';
                //     return avatar;
                // }, [avatar, imageErrors[physician_id]]);

                return (
                    <div
                    key={physician_id}
                    className="w-full rounded-md bg-white shadow-md p-3 flex gap-3 cursor-pointer hover:translate-y-2  ease-in-out duration-300 "
                    onClick={() => {
                        router.push(`/doctors/${physician_id}`);
                        setSelected_user({ ...data });
                    }}
                    >
                        <span className="h-[100px] w-[100px] rounded-md overflow-hidden relative bg-[#f2f2f2]">
                            <Image
                            src={avatar || '/default-doctor.svg'}
                            alt={`${first_name} ${last_name}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-md"
                            placeholder="blur"
                            blurDataURL="/default-doctor.svg"
                            onError={() => setImageErrors((prev) => ({ ...prev, [physician_id]: true }))}
                            unoptimized
                            />
                        </span>

                        <div className="flex-1 h-full flex flex-col items-start justify-center gap-1">
                            <p className="text-[15px] font-medium">Dr. {first_name} {last_name}</p>
                            <p className="text-[12px] text-green-600">Available</p>
                            <span className="flex items-start gap-2">
                            <p className="text-[13px]">Speciality:</p>
                            <p className="text-[13px]">{speciality}</p>
                            </span>
                            <span className="flex items-center gap-2">
                            <p className="text-[13px]">Languages:</p>
                            <span className="flex gap-1">
                                {languages_spoken.map((item: string, ind: number) => (
                                <p key={ind} className="text-[13px]">
                                    {item}
                                    {ind < languages_spoken.length - 1 ? ',' : ''}
                                </p>
                                ))}
                            </span>
                            </span>
                        </div>
                    </div>
                );
                })}
                {hasMore && (
                <div
                    ref={loadMoreRef}
                    className="w-full flex justify-center py-4"
                >
                    {loading && <p className="text-sm text-gray-600">Loading more doctors...</p>}
                </div>
                )}
            </div>
            )}
        </div>
        </div>
    );
};

export default DoctorsList;
